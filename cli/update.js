#!/usr/bin/env node
import update from 'npm-check-updates'

await update.run({
  // Directly write new versions to package.json.
  upgrade: true,
  // Verbose.
  silent: false,
  // Use regular formatter, not JSON.
  jsonUpgraded: false,
  // Increase timeout from default 30 seconds to 2 minutes.
  timeout: 120000,
})
