import { afterEach, beforeAll, beforeEach, expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'

const configurationPath = join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Documents/.env-variables')

// Create iCloud store mock in CI.
beforeAll(() => {
  if (process.env.CI) {
    mkdirSync(dirname(configurationPath), {
      recursive: true,
    })
  }
})

let initialContents = ''
beforeEach(() => {
  if (existsSync(configurationPath)) {
    initialContents = readFileSync(configurationPath, 'utf-8')
    rmSync(configurationPath)
  }
})

afterEach(() => {
  if (initialContents !== '') {
    writeFileSync(configurationPath, initialContents)
  }
})

test('Creates configuration file if none is found.', () => {
  expect(existsSync(configurationPath)).toBe(false)

  const output = execSync('bun cli/secret.ts', {
    cwd: '.',
    stdio: 'pipe',
  }).toString()

  expect(existsSync(configurationPath)).toBe(true)
  expect(output).toContain('Configuration file created in')
})

const exampleContents = `# Configuration managed by epic-cli

epic-language:

OPENAI_API_KEY=123
ANOTHER_KEY=456-789

another-project:

MY_KEY=567`

test('Can parse existing configuration.', () => {
  const epicLanguagePath = './test/fixture/secret/epic-language'
  writeFileSync(configurationPath, exampleContents)

  const output = execSync('bun ../../../../cli/secret.ts', {
    cwd: epicLanguagePath,
    stdio: 'pipe',
  }).toString()

  expect(output).toContain('Found existing configuration in')
})

test('Can parse existing dotenv.', () => {
  const anotherProjectPath = './test/fixture/secret/another-project'
  // writeFileSync(configurationPath, exampleContents)

  execSync('bun ../../../../cli/secret.ts', {
    cwd: anotherProjectPath,
    stdio: 'pipe',
  })

  const storeContents = readFileSync(configurationPath, 'utf-8')

  expect(storeContents).toContain('another-project:')
  expect(storeContents).toContain('MY_KEY=987')
  expect(storeContents).toContain('NEW_KEY=hello World!')
  expect(storeContents).not.toContain('epic-language:')

  const dotEnvContents = readFileSync(join(anotherProjectPath, '.env'), 'utf-8')

  expect(dotEnvContents).toContain('NEW_KEY=hello World!')
})

test('Can restore dotenv from store.', () => {
  const epicLanguagePath = './test/fixture/secret/epic-language'
  writeFileSync(configurationPath, exampleContents)

  execSync('bun ../../../../cli/secret.ts', {
    cwd: epicLanguagePath,
    stdio: 'pipe',
  })

  const dotEnvPath = join(epicLanguagePath, '.env')
  const dotEnvContents = readFileSync(dotEnvPath, 'utf-8')

  expect(dotEnvContents).toEqual(`OPENAI_API_KEY=123
ANOTHER_KEY=456-789`)

  rmSync(dotEnvPath)
})

const overrideContents = `# Configuration managed by epic-cli

another-project:

MY_KEY=123`

test('Will add new dotenv variables to store.', () => {
  const anotherProjectPath = './test/fixture/secret/another-project'
  writeFileSync(configurationPath, overrideContents)

  execSync('bun ../../../../cli/secret.ts', {
    cwd: anotherProjectPath,
    stdio: 'pipe',
  })

  const storeContents = readFileSync(configurationPath, 'utf-8')

  expect(storeContents).toContain('another-project:')
  expect(storeContents).toContain('MY_KEY=987') // Local values will override store.
  expect(storeContents).toContain('NEW_KEY=hello World!')
})
