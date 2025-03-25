import { defineConfig } from 'drizzle-kit'

export const gitignore = ['extends:bundle', 'drizzle', '*.sqlite']
export const vscode = 'biome'
export const biome = {
  extends: 'server',
  files: {
    ignore: ['drizzle.config.ts'],
  },
  linter: {
    rules: {
      correctness: {
        useImportExtensions: 'off',
      },
      suspicious: {
        noConsole: 'off',
      },
    },
  },
}

export const typescript = [
  {
    extends: 'server',
    include: ['index.ts'],
  },
]

export const drizzle = defineConfig({
  dialect: 'sqlite',
  schema: './schema.ts',
  out: './drizzle',
})
