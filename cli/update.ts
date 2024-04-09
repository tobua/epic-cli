#!/usr/bin/env bun
import { execSync } from 'child_process'
import { neq, valid } from 'semver'

const updatedDependencies: { name: string; previous: string; latest: string }[] = []
let processedDependencies = 0
const versionRangeRegex = /(\^|~|>=|>|<=|<)?\d+(\.\d+){0,2}(\.\*)?/
const packageJson = await Bun.file('./package.json').json()
const dependencyTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
  'bundleDependencies',
]

const dependencyCount = dependencyTypes.reduce(
  (total, type) => total + (packageJson[type] ? Object.keys(packageJson[type]).length : 0),
  0,
)

if (dependencyCount === 0) {
  console.log('No dependencies found.')
  process.exit(0)
}

process.stdout.write(`Updating ${dependencyCount} dependencies...\r`)

await Promise.all(
  dependencyTypes.map(async (type) => {
    const dependencies = packageJson[type] as { [key: string]: string }
    if (!dependencies) return

    const fetchPromises = Object.keys(dependencies).map(async (name) => {
      const previousVersionRange = dependencies[name]
      const previousVersion = previousVersionRange.replace(/^(\^|~|>=|>|<=|<)/, '')
      if (!valid(previousVersion)) return // Ignore invalid versions
      const versionRangeMatch = previousVersionRange.match(versionRangeRegex)
      if (!versionRangeMatch) return // Keep exact versions as they are
      const versionRange = versionRangeMatch ? versionRangeMatch[1] : null

      const { version } = await (await fetch(`https://registry.npmjs.org/${name}/latest`)).json()

      if (version && neq(version, previousVersion)) {
        dependencies[name] = `${versionRange || ''}${version}`
        updatedDependencies.push({
          name,
          previous: previousVersionRange,
          latest: `${versionRange || ''}${version}`,
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
  updatedDependencies.forEach((update) => {
    console.log(`\u001b[1m${update.name}\u001b[0m ${update.previous} ➜ ${update.latest}`)
  })
  Bun.write('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
  console.log('Installing new dependencies with Bun.')
  // Using bun shell here will not exit in tests...
  execSync('bun update', {
    stdio: 'inherit',
  })
} else {
  console.log('All dependencies are up to date.')
}
