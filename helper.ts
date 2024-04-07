import { readFileSync, realpathSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

export function getScripts() {
  // Warning if any of the available scripts collides with alreay existing command.
  let scripts = []

  try {
    scripts = Object.keys(
      JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8')).bin,
    )
  } catch (error) {
    // Optional check, ignore errors.
  }

  return scripts
}

export function scriptExists(script: string) {
  let output = ''

  try {
    output = execSync(`type ${script}`).toString()
  } catch (error) {
    return false
  }

  const listsPath = output.startsWith(`${script} is /`)

  // Ignore if command comes from previously installed plugin.
  if (listsPath && !realpathSync(output.match(/.*\sis\s(.*)/)[1]).includes('epic-cli')) return false

  return true
}
