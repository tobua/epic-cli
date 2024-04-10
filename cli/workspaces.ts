#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import mapWorkspaces from '@npmcli/map-workspaces'

const command = process.argv[2]
const showOutput = process.argv.includes('--output')

if (!command || typeof command !== 'string' || command.length === 0) {
  console.error(`Invalid or missing command provided, use like 'workspaces "update"'.`)
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

if (!(pkg && Array.isArray(pkg.workspaces)) || pkg.workspaces.length === 0) {
  console.error('Current project is not a workspace.')
  process.exit(1)
}

const workspaces = await mapWorkspaces({ pkg })

console.log(`Running "${command}" in ${workspaces.size} workspaces.`)

for (const workspacePath of workspaces.values()) {
  try {
    execSync(command, { cwd: workspacePath, stdio: showOutput ? 'inherit' : 'ignore' })
    // biome-ignore lint/correctness/noUnusedVariables: Showing custom error.
  } catch (error) {
    console.log(`Failed to run in ${workspacePath}.`)
  }
}
