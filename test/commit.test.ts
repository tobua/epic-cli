import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'

// biome-ignore lint/suspicious/noControlCharactersInRegex: Works...
const cleanOutputAnsi = (output: string) => output.replace(/\x1B\[[0-9;]*m/g, '')

test('Runs and lists all working scripts.', () => {
  const fixturePath = './test/fixture/commit/success'

  const output = cleanOutputAnsi(
    execSync('bun ./../../../../cli/commit.ts', {
      cwd: fixturePath,
      encoding: 'utf-8',
    }),
  )

  expect(output).toContain('✅ check')
  expect(output).toContain('✅ types')
  expect(output).toContain('✅ test')

  expect(output).not.toContain('❌')
})

test('Lists failure and runs available tests with "bun test".', () => {
  const fixturePath = './test/fixture/commit/failure'

  const output = cleanOutputAnsi(
    execSync('bun ./../../../../cli/commit.ts', {
      cwd: fixturePath,
      encoding: 'utf-8',
    }),
  )

  expect(output).toContain('❌ check')
  expect(output).not.toContain('types')
  expect(output).toContain('✅ test')
})
