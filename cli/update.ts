#!/usr/bin/env node
import { run } from 'npm-check-updates'
import { execSync } from 'child_process'
import { isBun } from '../helper'

const updatedDependencies = await run({
  // Directly write new versions to package.json.
  upgrade: true,
  // Verbose.
  silent: false,
  // Use regular formatter, not JSON.
  jsonUpgraded: false,
  // Increase timeout from default 30 seconds to 2 minutes.
  timeout: 120000,
})

if (isBun && updatedDependencies && Object.keys(updatedDependencies).length) {
  execSync('bun update', { stdio: 'inherit' })
}
