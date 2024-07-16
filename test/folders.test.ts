import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

test('Create a file in every folder matched by the glob.', () => {
  const fixturePath = './test/fixture/folders'
  const templatePath = join(fixturePath, 'template')

  if (!existsSync(fixturePath)) {
    mkdirSync(fixturePath, { recursive: true })
  }
  const subfolders = ['default', 'web', 'desktop', 'mobile']
  for (const folder of subfolders) {
    const folderPath = join(templatePath, folder)
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true })
    }
  }

  execSync('bun ./../../../cli/folders.ts "./template/*" "touch file.ts"', {
    cwd: fixturePath,
  })

  for (const folder of subfolders) {
    expect(existsSync(join(fixturePath, `template/${folder}/file.ts`))).toBe(true)
  }

  rmSync(fixturePath, { recursive: true })
})

test('Creates a file with nested globs.', () => {
  const fixturePath = './test/fixture/folders'

  if (!existsSync(fixturePath)) {
    mkdirSync(join(fixturePath, 'template/demo/nested'), { recursive: true })
  }

  execSync('bun ./../../../cli/folders.ts "./template/**/*" "touch file.ts"', {
    cwd: fixturePath,
  })

  expect(existsSync(join(fixturePath, 'template/demo/file.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'template/demo/nested/file.ts'))).toBe(true)

  rmSync(fixturePath, { recursive: true })
})
