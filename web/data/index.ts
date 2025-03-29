import { list, state } from 'epic-state'
import { server } from 'interface/server'

export const State = state({
  loading: true,
  error: false as boolean | string,
  tabs: list((tab: { location: string }) => tab, []),
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
