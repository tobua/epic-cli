#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import formatPackageJson from 'pakag'

const packageJsonPath = join(process.cwd(), 'package.json')

const packageContents = readFileSync(packageJsonPath, 'utf8')

const formattedContents = formatPackageJson(packageContents)

writeFileSync(packageJsonPath, formattedContents)
