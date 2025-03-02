#!/usr/bin/env bun
import { execSync } from 'node:child_process'
import { styleText } from 'node:util'
import { prompt } from 'prompts'

const getOpenPorts = (start: number, end: number) => {
  const openPorts: number[] = []

  for (let port = start; port <= end; port++) {
    try {
      const isOpen = execSync(`lsof -i :${port}`).toString().trim() !== ''
      if (isOpen) {
        openPorts.push(port)
      }
    } catch (_error) {
      // Fails if the port isn't open.
    }
  }
  return openPorts
}

const ports = getOpenPorts(3000, 3010)

if (ports.length === 0) {
  console.log('No open ports found.')
  process.exit(0)
}

const { ports: selection } = await prompt([
  {
    type: 'multiselect',
    name: 'ports',
    message: 'Which open ports do you want to close?',
    choices: ports.map((port) => ({ title: styleText('bold', String(port)), value: port })),
    instructions: false, // This is for advanced CLI users.
  },
])

if (!selection || selection.length === 0) {
  console.warn('No ports selected!')
  process.exit(0)
}

for (const port of selection) {
  try {
    execSync(`kill -9 $(lsof -t -i:${port})`)
    console.log(`Closed port ${styleText('bold', String(port))}.`)
  } catch (_error) {
    console.log(`Failed to close port ${styleText('bold', String(port))}.`)
  }
}
