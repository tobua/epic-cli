import { expect, test } from 'bun:test'
import { client } from 'eipiai'
import type { routes } from './index'
import { seed } from './seed'
import './index' // Start server.

await seed()

const server = client<typeof routes>({
  url: 'http://localhost:3000/data',
})

test('Initially there are two posts.', async () => {
  const { data } = await server.tabs()
  expect(data.length).toBe(1)
})

test('Inserts a new post.', async () => {
  const { data: id } = await server.addTab({ name: 'JSX', folder: 'epic-jsx' })

  expect(id).toBeNumber()

  const { data: tabs } = await server.tabs()

  expect(tabs.length).toBe(2)
  expect(tabs[1].name).toBe('JSX')
})
