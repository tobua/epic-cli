#!/usr/bin/env bun
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'

const modulesPath = join(process.cwd(), 'node_modules')

if (existsSync(modulesPath)) {
  rmSync(modulesPath, { recursive: true })
}

const lockFilePath = join(process.cwd(), 'bun.lockb')

if (process.argv.includes('--lock') && existsSync(lockFilePath)) {
  rmSync(lockFilePath)
}

await $`bun install`.nothrow()
