import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tabs = sqliteTable('tabs', {
  id: integer('id').primaryKey(),
  name: text({ length: 64 }),
  folder: text({ length: 256 }),
})
