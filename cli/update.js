#!/usr/bin/env node
import update from 'npm-check-updates'

console.log(process.env.INIT_CWD, process.cwd(), process.env.PWD, '\n')

await update.run({
  // Directly write new versions to package.json.
  upgrade: true,
  // Verbose.
  silent: false,
  // Use regular formatter, not JSON.
  jsonUpgraded: false,
})
