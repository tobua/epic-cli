#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

// Entry file used for when running through "bunx".

const url = new URL(import.meta.url) // Points to this file on the file system.
const cliFolderPath = url.pathname.split('/').slice(0, -1).join('/')
const script = process.argv.slice(2)[0]
const scriptFilePath = join(cliFolderPath, `${script}.ts`)

if (!existsSync(scriptFilePath)) {
  console.error(`Script ${script} not found.`)
}

const additionalArguments = process.argv.slice(3).join(' ')

execSync(`bun ${scriptFilePath} ${additionalArguments}`, {
  stdio: 'inherit',
})
