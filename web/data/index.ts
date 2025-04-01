import { list, state } from 'epic-state'
import { server } from 'interface/server'

let outputRef: HTMLElement

function addLines(content: string) {
  let lines = outputRef.textContent.split('\n')
  lines.push(content)
  if (lines.length > 100) {
    lines = lines.slice(-100)
  }
  outputRef.textContent = lines.join('\n')
}

export const State = state({
  loading: true,
  error: false as boolean | string,
  tabs: list((tab: { location: string }) => tab, []),
  run: (command: string) => {
    console.log('run', command)

    if (outputRef) {
      addLines(command)
    }
  },
  connect: (ref: HTMLElement) => {
    console.log('ref', ref)
    outputRef = ref
  },
})

async function loadData() {
  State.loading = true
  const { error, data } = await server.tabs()
  State.loading = false
  if (error) {
    State.error = error
    return
  }
  State.tabs.replace(data)
}

loadData()
