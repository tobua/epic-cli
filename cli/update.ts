#!/usr/bin/env bun
import { execSync } from 'child_process'
import { maxSatisfying, neq } from 'semver'

let updatedDependencies = 0
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

console.log(`Updating ${dependencyCount} dependencies...`)

await Promise.all(
  dependencyTypes.map(async (type) => {
    const dependencies = packageJson[type] as { [key: string]: string }

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const dependency in dependencies) {
      const name = dependency
      const previousVersion = dependencies[dependency]
      const versionRangeMatch = previousVersion.match(versionRangeRegex)
      const versionRange = versionRangeMatch ? versionRangeMatch[1] : null

      // eslint-disable-next-line no-await-in-loop
      const { versions } = await (await fetch(`https://registry.npmjs.org/${name}`)).json()

      const mostRecentApplicableVersion = maxSatisfying(Object.keys(versions), '*')

      if (
        mostRecentApplicableVersion &&
        neq(mostRecentApplicableVersion, previousVersion.replace(/^(\^|~|>=|>|<=|<)/, ''))
      ) {
        dependencies[dependency] = `${versionRange || ''}${mostRecentApplicableVersion}`
        updatedDependencies += 1
      }
    }
  }),
)

if (updatedDependencies !== 0) {
  console.log(`${updatedDependencies} dependencies updated.`)
  Bun.write('./package.json', JSON.stringify(packageJson, null, 2))
  console.log('Updating dependencies...')
  // Using bun shell here will not exit in tests...
  execSync('bun update', {
    stdio: 'inherit',
  })
} else {
  console.log('All dependencies are up to date.')
}
