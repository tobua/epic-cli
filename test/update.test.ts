import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { gte } from 'semver'

test('Lists package updates.', () => {
  const initialPackage = JSON.parse(readFileSync('./test/fixture/update/basic/package.json', 'utf-8'))

  execSync('bun ../../../../cli/update.ts', {
    cwd: './test/fixture/update/basic',
    stdio: 'inherit',
  })

  const modifiedPackage = JSON.parse(readFileSync('./test/fixture/update/basic/package.json', 'utf-8'))

  expect(initialPackage.dependencies.react).not.toEqual(modifiedPackage.dependencies.react)
  expect(initialPackage.dependencies['react-dom']).not.toEqual(modifiedPackage.dependencies['react-dom'])
  expect(initialPackage.dependencies.mobx).not.toEqual(modifiedPackage.dependencies.mobx)
  // Exact versions not updated.
  expect(initialPackage.dependencies.tailwindcss).toEqual(modifiedPackage.dependencies.tailwindcss)

  expect(modifiedPackage.dependencies.react).toContain('^')
  expect(modifiedPackage.dependencies['react-dom']).toContain('~')
  expect(modifiedPackage.dependencies.naven).toEqual('emotion')
  expect(modifiedPackage.dependencies['@rsbuild/core']).toContain('~')
  expect(gte(modifiedPackage.dependencies['@rsbuild/core'].replace('~', ''), '0.5.9')).toBe(true)
  // devDependencies also updated.
  expect(gte(modifiedPackage.devDependencies.immer.replace('~', ''), '10.0.4')).toBe(true)
  // Ranges kept intact.
  expect(modifiedPackage.peerDependencies.immutable).toEqual('>= 3.7')

  // bun update was run.
  expect(existsSync('./test/fixture/update/basic/bun.lock')).toBe(true)

  // Reset package contents.
  writeFileSync('./test/fixture/update/basic/package.json', JSON.stringify(initialPackage, null, 2))
  rmSync('./test/fixture/update/basic/bun.lock')
  rmSync('./test/fixture/update/basic/node_modules', { recursive: true })
}, 120000)

test('Skips update if all dependencies are already up-to-date.', () => {
  const initialPackage = JSON.parse(readFileSync('./test/fixture/update/up-to-date/package.json', 'utf-8'))

  execSync('bun ../../../../cli/update.ts', {
    cwd: './test/fixture/update/up-to-date',
    stdio: 'inherit',
  })

  const modifiedPackage = JSON.parse(readFileSync('./test/fixture/update/up-to-date/package.json', 'utf-8'))

  expect(initialPackage).toEqual(modifiedPackage)

  // No update necessary.
  expect(existsSync('./test/fixture/update/basic/bun.lock')).toBe(false)
})
