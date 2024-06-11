#!/usr/bin/env bun
/* eslint-disable no-continue,no-restricted-syntax */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, dirname, join } from 'node:path'

const configurationFile = '.env-variables'
const configurationPath = join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Documents', configurationFile)

if (!existsSync(dirname(configurationPath))) {
  console.log('Cannot find iCloud folder, make sure to enable synchronization.')
  process.exit(1)
}

// Example: { epic-language: { OPENAI_API_KEY: '123' } }
const configuration: { [key: string]: { [key: string]: string } } = {}
const projectName = basename(process.cwd())

if (!projectName) {
  console.log(`Cannot find the current project in "${process.cwd()}".`)
  process.exit(1)
}

function parseConfiguration(contents: string) {
  let currentProject: string | undefined = undefined

  const lines = contents.split('\n')

  for (const line of lines) {
    const trimmedLine = line.trim()

    // Skip comments and empty lines
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }

    // Check if the line is a project declaration
    const projectMatch = trimmedLine.match(/^([^:]+):$/)
    if (projectMatch) {
      ;[, currentProject] = projectMatch
      configuration[currentProject as string] = {}
    } else {
      // Parse key-value pairs for the current project
      const [key, value] = trimmedLine.split('=')
      if (key && value && currentProject) {
        const current = configuration[currentProject]
        if (current) {
          current[key.trim()] = value.trim()
        }
      }
    }
  }
}

function createConfigurationTemplate() {
  let lines = '# Configuration managed by epic-cli\n\n'
  const projects = Object.entries(configuration)

  projects.forEach(([project, keyValuePairs], index) => {
    lines += `${project}:\n\n`
    for (const [key, value] of Object.entries(keyValuePairs)) {
      lines += `${key}=${value}\n`
    }
    if (index !== projects.length - 1) {
      lines += '\n'
    }
  })

  return lines
}

function parseDotenvFile(content: string) {
  const lines = content.split('\n')
  const parsedEnv: { [key: string]: string } = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const line of lines) {
    // Skip comments and empty lines
    if (line.trim() === '' || line.trim().startsWith('#')) {
      continue
    }

    // Parse key-value pairs
    const [key, value] = line.split('=')
    if (key && value) {
      parsedEnv[key.trim()] = value.trim()
    }
  }

  return parsedEnv
}

if (existsSync(configurationPath)) {
  console.log(`Found existing configuration in iCloud » Documents » ${configurationFile}`)
  parseConfiguration(readFileSync(configurationPath, 'utf-8'))
} else {
  console.log(`Configuration file created in iCloud » Documents » ${configurationFile}`)
  const emptyTemplate = createConfigurationTemplate()
  writeFileSync(configurationPath, emptyTemplate)
}

if (process.argv.includes('--list')) {
  console.log(configuration)
  process.exit(0)
}

if (!configuration[projectName]) {
  configuration[projectName] = {}
}

const dotEnvPath = join(process.cwd(), '.env')

if (existsSync(dotEnvPath)) {
  const localConfiguration = parseDotenvFile(readFileSync(dotEnvPath, 'utf-8'))
  // Merge configurations, local takes precedence, in case it was edited.
  Object.assign(configuration[projectName] as object, localConfiguration)
}

const updatedTemplate = createConfigurationTemplate()
writeFileSync(configurationPath, updatedTemplate)

writeFileSync(
  dotEnvPath,
  Object.entries(configuration[projectName] as object)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n'),
)
