#!/usr/bin/env bun
import { execSync } from 'node:child_process'

const listFiles = process.argv.includes('--files')

const tscOutput = execSync('bun tsc --noEmit --listFiles', { encoding: 'utf-8', cwd: process.cwd() })

const processedOutput = tscOutput
  .split('\n')
  .filter((line) => !line.includes('node_modules'))
  .map((line) => line.replace(process.cwd(), '.'))
  .filter((line) => line.trim() !== '')

const filePaths = processedOutput.map((line) => line.split(':')[0])
const uniqueFilePaths = [...new Set(filePaths)]

console.log(`\x1b[1m${uniqueFilePaths.length}\x1b[0m files checked.`)

if (listFiles) {
  console.log(uniqueFilePaths.join('\n'))
}
