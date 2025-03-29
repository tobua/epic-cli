import { client } from 'eipiai'
import type { routes } from '../../server'

// @ts-expect-error
export const server = client<typeof routes>({ url: 'http://localhost:3001/data' })
