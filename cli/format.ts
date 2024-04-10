#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { formatPackageJson } from 'pakag'

const packageJsonPath = join(process.cwd(), 'package.json')
const packageContents = readFileSync(packageJsonPath, 'utf8')
const formattedContents = await formatPackageJson(packageContents)

writeFileSync(packageJsonPath, formattedContents)
