import { getScripts, scriptExists } from '../helper'

for (const script of getScripts()) {
  const exists = scriptExists(script)

  if (exists) {
    console.warn(`epic-cli: Command ${script} already exists and might not work or will be overwritten.`)
  }
}
