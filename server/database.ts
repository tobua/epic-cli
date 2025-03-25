import { Database } from 'bun:sqlite'
import { type BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import * as schema from './schema'

type Connection = BunSQLiteDatabase<typeof schema> & { $client: Database }

let connection: Connection | undefined

export function connect() {
  if (!connection) {
    initialize()
  }

  return connection as Connection
}

export function initialize() {
  console.log('Initializing databases...')
  const platform = new Database('database.sqlite')
  connection = drizzle({ schema, client: platform })
  migrate(connection, { migrationsFolder: './drizzle' })
  console.log('Databases created.')
}
