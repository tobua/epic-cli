#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { styleText } from 'node:util'

const commitScripts = ['check', 'types', 'test']

const { scripts } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

function runScript(script: string, builtIn = false) {
  try {
    execSync(`bun ${builtIn ? '' : 'run '}${script}`, {
      cwd: process.cwd(),
      stdio: 'pipe',
    })
    console.log(`✅ ${styleText('bold', script)} "${styleText('gray', builtIn ? `bun ${script}` : scripts[script])}" succeeded.`)
  } catch (_error) {
    console.log(`❌ ${styleText('bold', script)} "${styleText('gray', builtIn ? `bun ${script}` : scripts[script])}" failed.`)
  }
}

for (const script of commitScripts) {
  if (Object.hasOwn(scripts, script)) {
    runScript(script)
  }
}

if (!Object.hasOwn(scripts, 'test') && existsSync(join(process.cwd(), 'test'))) {
  runScript('test', true)
}
