#!/usr/bin/env node
import { join } from 'path'
import rimraf from 'rimraf'
import { execSync } from 'child_process'

rimraf(join(process.cwd(), 'node_modules'))
rimraf(join(process.cwd(), 'package-lock.json'))

execSync('npm install', { stdio: 'inherit' })
