import { cors } from '@elysiajs/cors'
import { api, route, z } from 'eipiai'
import { eipiai } from 'eipiai/elysia'
import { Elysia } from 'elysia'
import { connect } from './database'
import { environmentVariables } from './route/environment'
import * as schema from './schema'

export const routes = api({
  tabs: route()(async () => {
    return await connect().query.tabs.findMany({
      columns: {
        id: true,
        name: true,
        folder: true,
      },
    })
  }),
  addTab: route(
    z.object({
      name: z.string().max(64),
      folder: z.string().max(256),
    }),
  )(async (_, { name, folder }) => {
    const tabs = await connect()?.insert(schema.tabs).values({ name, folder }).returning({ id: schema.tabs.id })
    return tabs[0].id
  }),
  environmentVariables,
})

const { server } = new Elysia()
  .use(cors())
  .use(eipiai(routes, { path: 'data' }))
  .listen(3001)

console.log(`Server running on "${server?.url}data"!`)
