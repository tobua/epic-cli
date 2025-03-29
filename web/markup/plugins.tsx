import { Alert, Loader } from 'markup/components'
import { Text } from 'tags'

export const loading = (loading: boolean) => loading && <Loader />
export const error = (error: boolean | string) => error && <Alert message={error} />
export const empty = (ready: boolean) => !ready && <Text>Data missing!</Text>
