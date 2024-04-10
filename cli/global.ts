#!/usr/bin/env bun
import { $ } from 'bun'

console.log('Globally installed packages:')

const { exitCode } = await $`bun pm ls -g`.nothrow()

if (exitCode === 1) {
  console.log('No global packages installed.')
}

console.log('Updating globally installed packages...')

await $`bun update -g`.nothrow()
