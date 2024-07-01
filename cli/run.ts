#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { prompt } from 'prompts'
import { bold } from '../helper'

const { scripts } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

const { scripts: selection } = await prompt([
  {
    type: 'multiselect',
    name: 'scripts',
    message: 'Which scripts do you want to run?',
    choices: Object.entries(scripts).map((entry) => ({ title: `${bold(entry[0])}: ${entry[1]}`, value: entry[0] })),
  },
])

if (!selection || selection.length === 0) {
  console.warn('No script selected!')
  process.exit(0)
}

for (const script of selection as string[]) {
  console.log(`Running script ${bold(script)}.`)
  try {
    execSync(`bun run ${scripts[script]}`, { cwd: process.cwd(), stdio: 'inherit' })
  } catch (_error) {
    console.error(`${bold(script)} failed.`)
  }
}
