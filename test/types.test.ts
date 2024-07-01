import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'

test('Checks types and lists file count.', () => {
  const output = execSync('bun ./cli/types.ts', {
    cwd: '.',
  }).toString()

  // biome-ignore lint/suspicious/noControlCharactersInRegex: Don't get what's the problem...
  expect(output).toMatch(/^\u001B\[1m\d{2}\u001B\[0m files checked/)
})

test('Checks types with --files flag and lists specific files.', () => {
  const output = execSync('bun ./cli/types.ts --files', {
    cwd: '.',
  }).toString()

  expect(output).toContain('helper.ts')
  expect(output).toContain('cli/files.ts')
})
