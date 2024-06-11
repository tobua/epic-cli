import { execSync } from 'node:child_process'
import { readFileSync, realpathSync } from 'node:fs'
import { join } from 'node:path'

export function getScripts() {
  // Warning if any of the available scripts collides with alreay existing command.
  let scripts: string[] = []

  try {
    scripts = Object.keys(JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8')).bin)
    // biome-ignore lint/correctness/noUnusedVariables: Optional check, ignore errors.
    // biome-ignore lint/suspicious/noEmptyBlockStatements: Error unhandled.
  } catch (error) {}

  return scripts
}

export function scriptExists(script: string) {
  let output = ''

  try {
    output = execSync(`type ${script}`).toString()
    // biome-ignore lint/correctness/noUnusedVariables: Error expected.
  } catch (error) {
    return false
  }

  const listsPath = output.startsWith(`${script} is /`)

  // Ignore if command comes from previously installed plugin.
  if (listsPath && !realpathSync((output.match(/.*\sis\s(.*)/) ?? [])[1] as string).includes('epic-cli')) {
    return false
  }

  return true
}

export const bold = (text: string) => `\x1b[1m${text}\x1b[0m`
