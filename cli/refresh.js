#!/usr/bin/env node
import { existsSync, rmSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const modulesPath = join(process.cwd(), 'node_modules')

if (existsSync(modulesPath)) {
  rmSync(modulesPath, { recursive: true })
}

const lockFilePath = join(process.cwd(), 'package-lock.json')

if (process.argv.includes('--lock') && existsSync(lockFilePath)) {
  rmSync(lockFilePath)
}

execSync('npm install --legacy-peer-deps', { stdio: 'inherit' })
