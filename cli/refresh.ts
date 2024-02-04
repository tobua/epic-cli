#!/usr/bin/env node
import { existsSync, rmSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import { isBun } from '../helper'

const modulesPath = join(process.cwd(), 'node_modules')

if (existsSync(modulesPath)) {
  rmSync(modulesPath, { recursive: true })
}

const lockFilePath = join(process.cwd(), isBun ? 'bun.lockb' : 'package-lock.json')

if (process.argv.includes('--lock') && existsSync(lockFilePath)) {
  rmSync(lockFilePath)
}

if (isBun) {
  execSync('bun install', { stdio: 'inherit' })
} else {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' })
}
