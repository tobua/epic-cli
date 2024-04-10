#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

// Entry file used for when running through "bunx".

console.log(process.argv, process.cwd(), process.env.PWD, import.meta.url)

const script = process.argv.slice(2)[0]

if (!existsSync(join(process.cwd(), `cli/${script}.ts`))) {
  console.error(`Script ${script} not found.`)
}

execSync(`bun ./cli/${script}.ts`, {
  stdio: 'inherit',
})
