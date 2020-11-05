#!/usr/bin/env node
import { execSync } from 'child_process'
import latestVersion from 'latest-version'

const npmVersion = execSync('npm -v')
  .toString()
  // Remove newlines.
  .replace(/(\r\n|\n|\r)/gm, '')
const latestNpmVersion = await latestVersion('npm', { version: 'next' })

console.log(`node: ${process.versions.node}`)
console.log(`npm: ${npmVersion} [${latestNpmVersion}]`)
