#!/usr/bin/env bun
import { existsSync, rmSync } from 'fs'
import { $ } from 'bun'
import { join } from 'path'

const modulesPath = join(process.cwd(), 'node_modules')

if (existsSync(modulesPath)) {
  rmSync(modulesPath, { recursive: true })
}

const lockFilePath = join(process.cwd(), 'bun.lockb')

if (process.argv.includes('--lock') && existsSync(lockFilePath)) {
  rmSync(lockFilePath)
}

await $`bun install`.nothrow()
