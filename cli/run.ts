#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { styleText } from 'node:util'
import { prompt } from 'prompts'

const { scripts } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

const { scripts: selection } = await prompt([
  {
    type: 'multiselect',
    name: 'scripts',
    message: 'Which scripts do you want to run?',
    choices: Object.entries(scripts).map((entry) => ({ title: `${styleText('bold', entry[0])}: ${entry[1]}`, value: entry[0] })),
    instructions: false, // This is for advanced CLI users.
  },
])

if (!selection || selection.length === 0) {
  console.warn('No script selected!')
  process.exit(0)
}

for (const script of selection as string[]) {
  console.log(`Running script ${styleText('bold', script)}.`)
  try {
    execSync(`bun run ${script}`, { cwd: process.cwd(), stdio: 'inherit' })
  } catch (_error) {
    console.error(`${styleText('bold', script)} failed.`)
  }
}
