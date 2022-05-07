#!/usr/bin/env node
import { join } from 'path'
import rimraf from 'rimraf'
import { execSync } from 'child_process'

const options = process.argv.splice(2)

rimraf.sync(join(process.cwd(), 'node_modules'))

if (options.includes('--lock')) {
  rimraf.sync(join(process.cwd(), 'package-lock.json'))
}

execSync('npm install --legacy-peer-deps', { stdio: 'inherit' })
