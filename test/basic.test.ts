import { test, expect } from 'bun:test'
import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs'
import { execSync } from 'child_process'

test('Lists package updates.', async () => {
  const initialPackage = JSON.parse(
    readFileSync('./test/fixture/update/basic/package.json', 'utf-8'),
  )

  execSync('bun ../../../../cli/update.ts', {
    cwd: './test/fixture/update/basic',
    stdio: 'inherit',
  })

  const modifiedPackage = JSON.parse(
    readFileSync('./test/fixture/update/basic/package.json', 'utf-8'),
  )

  expect(initialPackage.dependencies.react).not.toEqual(modifiedPackage.dependencies.react)
  expect(initialPackage.dependencies['react-dom']).not.toEqual(
    modifiedPackage.dependencies['react-dom'],
  )
  expect(initialPackage.dependencies.mobx).not.toEqual(modifiedPackage.dependencies.mobx)

  expect(modifiedPackage.dependencies.react).toContain('^')
  expect(modifiedPackage.dependencies['react-dom']).toContain('~')

  // bun update was run.
  expect(existsSync('./test/fixture/update/basic/bun.lockb')).toBe(true)

  // Reset package contents.
  writeFileSync('./test/fixture/update/basic/package.json', JSON.stringify(initialPackage, null, 2))
  rmSync('./test/fixture/update/basic/bun.lockb')
  rmSync('./test/fixture/update/basic/node_modules', { recursive: true })
})

test('Skips update if all dependencies are already up-to-date.', async () => {
  const initialPackage = JSON.parse(
    readFileSync('./test/fixture/update/up-to-date/package.json', 'utf-8'),
  )

  execSync('bun ../../../../cli/update.ts', {
    cwd: './test/fixture/update/up-to-date',
    stdio: 'inherit',
  })

  const modifiedPackage = JSON.parse(
    readFileSync('./test/fixture/update/up-to-date/package.json', 'utf-8'),
  )

  expect(initialPackage).toEqual(modifiedPackage)

  // No update necessary.
  expect(existsSync('./test/fixture/update/basic/bun.lockb')).toBe(false)
})
