#!/usr/bin/env node
import { writeFileSync } from 'fs'
import { userInfo } from 'os'
import { join, basename } from 'path'
import formatPackageJson from 'pakag'
import validate from 'validate-npm-package-name'

let name = process.argv.slice(2)[0]

// If no name is defined, use containing folder.
if (!name) {
  name = basename(process.cwd())
  name = name.toLowerCase().replace(' ', '-')
} else if (!validate(name).validForNewPackages) {
  console.error(`Package name ${name} not valid for npm packages.`)
  process.exit(1)
}

const pkg = {
  name,
  version: '0.0.0',
  license: 'MIT',
  author: userInfo().username,
}

const packageJsonPath = join(process.cwd(), 'package.json')
const formattedContents = formatPackageJson(JSON.stringify(pkg))

writeFileSync(packageJsonPath, formattedContents)
