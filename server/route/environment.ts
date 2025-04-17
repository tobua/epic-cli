import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { route } from 'eipiai'

export const environmentVariables = route()(({ error }) => {
  const configurationFile = '.env-variables'
  const configurationPath = join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Documents', configurationFile)
  const envVars: { [key: string]: string } = {}

  if (!existsSync(configurationPath)) {
    error(`Configuration file not found in iCloud » Documents » ${configurationFile}`)
    return envVars
  }

  const configuration: { [key: string]: string[] } = {}
  let currentProject: string | undefined
  const contents = readFileSync(configurationPath, 'utf-8')
  const lines = contents.split('\n')

  for (const line of lines) {
    const trimmedLine = line.trim()
    const projectMatch = trimmedLine.match(/^([^:]+):$/)
    if (projectMatch) {
      ;[, currentProject] = projectMatch
      configuration[currentProject as string] = []
    } else if (line !== '') {
      const current = configuration[currentProject as string]
      current?.push(line)
    }
  }

  const variablesPerProject: Record<string, Record<string, string>> = {}

  // Parse environment variables
  for (const project in configuration) {
    variablesPerProject[project] = {}
    for (const line of configuration[project]) {
      const [key, ...valueParts] = line.split('=')
      const value = valueParts.join('=') // Rejoin in case value contains = signs
      if (key && value) {
        variablesPerProject[project][key.trim()] = value.trim()
      }
    }
  }

  return variablesPerProject
})
