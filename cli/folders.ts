#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { globSync } from 'fast-glob'

const [, , globPattern, ...commandParts] = process.argv
const command = commandParts.join(' ')
const showOutput = process.argv.includes('--output')

if (!(globPattern && command)) {
  console.error(`Invalid or missing arguments. Use like 'folders ./template/* "update --no-install"'.`)
  process.exit(1)
}

const folders = globSync(globPattern, { onlyDirectories: true })

if (folders.length === 0) {
  console.error('No folders matched the provided glob pattern.')
  process.exit(1)
}

console.log(`Running "${command}" in ${folders.length} folders.`)

for (const folder of folders) {
  try {
    execSync(command, { cwd: folder, stdio: showOutput ? 'inherit' : 'ignore' })
    // biome-ignore lint/correctness/noUnusedVariables: Showing custom error.
  } catch (error) {
    console.log(`Failed to run in ${folder}.`)
  }
}
