#!/usr/bin/env node
import { join } from 'path'
import rimraf from 'rimraf'
import { execSync } from 'child_process'

rimraf.sync(join(process.cwd(), 'node_modules'))
rimraf.sync(join(process.cwd(), 'package-lock.json'))

execSync('npm install', { stdio: 'inherit' })
