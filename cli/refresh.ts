#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const modulesPath = join(process.cwd(), 'node_modules')

if (existsSync(modulesPath)) {
  rmSync(modulesPath, { recursive: true })
}

const legacyLockFilePath = join(process.cwd(), 'bun.lockb')
const newLockFilePath = join(process.cwd(), 'bun.lock')

if (existsSync(legacyLockFilePath)) {
  rmSync(legacyLockFilePath)
}

if (existsSync(newLockFilePath)) {
  rmSync(newLockFilePath)
}

execSync('bun install', { cwd: process.cwd(), stdio: 'inherit' })
