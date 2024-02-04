import { skip } from 'skip-local-postinstall'
import { getScripts, scriptExists } from './helper'

skip()

getScripts().forEach((script) => {
  const exists = scriptExists(script)

  if (exists) {
    console.warn(
      `epic-cli: Command ${script} already exists and might not work or will be overwritten.`,
    )
  }
})
