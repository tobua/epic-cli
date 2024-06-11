#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import Bun from 'bun'
import { diff, neq, valid } from 'semver'
import { bold } from '../helper'

const updatedDependencies: { name: string; previous: string; latest: string; breaking: boolean }[] = []
let processedDependencies = 0
const versionRangeRegex = /(\^|~|>=|>|<=|<)?\d+(\.\d+){0,2}(\.\*)?/
const versionRangeReplaceRegex = /^(\^|~|>=|>|<=|<)/
const packageJson = await Bun.file('./package.json').json()
const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies', 'bundleDependencies']
const exactDependencies = [] as { name: string; version: string }[]

const dependencyCount = dependencyTypes.reduce((total, type) => total + (packageJson[type] ? Object.keys(packageJson[type]).length : 0), 0)

if (dependencyCount === 0) {
  console.log('No dependencies found.')
  process.exit(0)
}

process.stdout.write(`Updating ${dependencyCount} dependencies...\r`)

await Promise.all(
  dependencyTypes.map(async (type) => {
    const dependencies = packageJson[type] as { [key: string]: string }
    if (!dependencies) {
      return
    }

    const fetchPromises = Object.keys(dependencies).map(async (name) => {
      const previousVersionRange = dependencies[name]

      if (!previousVersionRange) {
        return
      }
      const previousVersion = previousVersionRange.replace(versionRangeReplaceRegex, '')
      if (!valid(previousVersion)) {
        return // Ignore invalid versions
      }
      const versionRange = (previousVersionRange.match(versionRangeRegex) ?? [])[1]
      if (!versionRange) {
        exactDependencies.push({ name, version: previousVersionRange })
        return // Keep exact versions as they are
      }

      const { version } = (await (await fetch(`https://registry.npmjs.org/${name}/latest`)).json()) as { version?: string }

      if (version && neq(version, previousVersion)) {
        dependencies[name] = `${versionRange || ''}${version}`
        updatedDependencies.push({
          name,
          previous: previousVersionRange,
          latest: `${versionRange || ''}${version}`,
          breaking: diff(previousVersion, version) === 'major',
        })
      }

      processedDependencies += 1
      process.stdout.write(`Updating ${processedDependencies}/${dependencyCount} dependencies...\r`)
    })

    await Promise.all(fetchPromises)
  }),
)

process.stdout.write('\r\x1b[K') // Clear progress output.

if (updatedDependencies.length !== 0) {
  console.log(`${updatedDependencies.length} dependencies updated.`)
  for (const update of updatedDependencies) {
    console.log(
      `\u001b[1m${update.name}\u001b[0m ${update.previous} ➜ ${update.latest}${
        update.breaking ? ' \u001b[1m\u001b[31mBREAKING CHANGE!\u001b[0m' : ''
      }`,
    )
  }
  Bun.write('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
  console.log('Installing new dependencies with Bun.')
  // Using bun shell here will not exit in tests...
  execSync('bun update', {
    stdio: 'inherit',
  })
  // NOTE write package again after "bun update" as it will turn ~ ranges into ^ ranges.
  Bun.write('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
} else {
  console.log('All dependencies are up to date.')
}

if (exactDependencies.length) {
  console.log(
    `Warning: Dependencies ${exactDependencies.map(({ name, version }) => `${bold(name)} (${version})`).join(',')} won't be updated as they are exact. Add a version range to ensure automatic updates.`,
  )
}
