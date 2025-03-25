import { connect } from './database'
import * as schema from './schema'

export async function seed() {
  await clear()

  console.log('Seeding database...\r')

  const db = connect()

  await db.insert(schema.tabs).values({
    name: 'EPIC CLI',
    folder: 'epic-cli',
  })

  console.log('Database seeded!')
}

export async function clear() {
  console.log('Clearing database...')

  const db = connect()

  const schemas = Object.keys(schema)
    .filter((item) => !item.toLowerCase().includes('relation'))
    .filter((item) => !item.toLowerCase().includes('enum'))
    // projects table must be deleted last due to dependencies.
    .sort((a, b) => (a === 'projects' ? 1 : b === 'projects' ? -1 : 0))

  for (const name of schemas) {
    await db.delete(schema[name])
  }

  console.log('Database cleared!')
}

if (process.argv.includes('--seed')) {
  await seed()
}
