import { expect, test } from 'bun:test'
import { getScripts, scriptExists } from '../helper'

test('Scripts are listed.', () => {
  expect(getScripts()).toContain('update')
  expect(getScripts()).toContain('refresh')
})

test('Identifies whether a script is already installed.', () => {
  expect(scriptExists('pwd')).toBe(true)
  expect(scriptExists('secret')).toBe(!process.env.CI)
  expect(scriptExists('update')).toBe(!process.env.CI)
  expect(scriptExists('non-existing')).toBe(false)
})
