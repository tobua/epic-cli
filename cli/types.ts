#!/usr/bin/env bun
import { type ExecException, execSync } from 'node:child_process'
import { styleText } from 'node:util'

const listFiles = process.argv.includes('--files')

let tscOutput: string | undefined
let hasErrors = false

try {
  tscOutput = execSync('bun tsc --noEmit --listFiles', { encoding: 'utf-8', cwd: process.cwd(), stdio: 'pipe' })
} catch (error) {
  hasErrors = true
  tscOutput = (error as ExecException).stdout
}

if (!tscOutput) {
  console.log('Failed to generate output.')
  process.exit(0)
}

const processedOutput = tscOutput
  .split('\n')
  .filter((line) => !line.includes('node_modules'))
  .map((line) => line.replace(process.cwd(), '.'))
  .filter((line) => line.trim() !== '')

if (hasErrors) {
  // TODO ascii formatting of output isn't preserved currently, ascii encoding will not solve the issue.
  const filteredOutput = tscOutput
    .split('\n')
    .filter((line) => !line.startsWith(process.cwd()))
    .join('\n')
  console.log(filteredOutput)
}

const filePaths = processedOutput.map((line) => line.split(':')[0])
const uniqueFilePaths = [...new Set(filePaths)]

console.log(`${styleText('bold', String(uniqueFilePaths.length))} files checked.`)

if (listFiles) {
  console.log(uniqueFilePaths.join('\n'))
}
