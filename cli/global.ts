#!/usr/bin/env node
import { execSync } from 'child_process'
import update from 'npm-check-updates'
import { isBun } from '../helper'

if (isBun) {
  execSync('bun pm ls -g', { stdio: 'inherit' })
} else {
  execSync('npm list -g --depth=0', { stdio: 'inherit' })
}

await update({
  global: true,
  // Verbose.
  silent: false,
  // Use regular formatter, not JSON.
  jsonUpgraded: false,
  // Also upgrade peerDependencies.
  dep: 'prod,dev,bundle,optional,peer',
})
