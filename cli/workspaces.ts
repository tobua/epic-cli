#!/usr/bin/env node
import { readFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import mapWorkspaces from '@npmcli/map-workspaces'

const command = process.argv[2]
const showOutput = process.argv.includes('--output')

if (!command || typeof command !== 'string' || command.length === 0) {
  console.error(`Invalid or missing command provided, use like 'workspaces "update"'.`)
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

if (!pkg || !Array.isArray(pkg.workspaces) || pkg.workspaces.length === 0) {
  console.error('Current project is not a workspace.')
  process.exit(1)
}

const workspaces = await mapWorkspaces({ pkg })

console.log(`Running "${command}" in ${workspaces.size} workspaces.`)

Array.from(workspaces.values()).forEach((workspacePath) => {
  try {
    execSync(command, { cwd: workspacePath, stdio: showOutput ? 'inherit' : 'ignore' })
  } catch (error) {
    console.log(`Failed to run in ${workspacePath}.`)
  }
})
