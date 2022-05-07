import { readFileSync, realpathSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import { skip } from 'skip-local-postinstall'

skip()

// Warning if any of the available scripts collides with alreay existing command.
let scripts = []

try {
  scripts = Object.keys(JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8')).bin)
} catch (error) {
  // Optional check, ignore errors.
}

scripts.forEach((script) => {
  let scriptAlreadyExists = false
  let output = ''

  try {
    output = execSync(`type ${script}`).toString()
  } catch (error) {
    scriptAlreadyExists = true
  }

  if (scriptAlreadyExists) {
    // Ignore if command comes from previously installed plugin.
    const path = realpathSync(output.match(/.*\sis\s(.*)/)[1])

    if (!path.includes('epic-cli')) {
      console.warn(
        `epic-cli: Command ${script} already exists and might not work or will be overwritten.`
      )
    }
  }
})
