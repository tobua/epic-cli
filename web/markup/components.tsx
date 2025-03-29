import { Loader as LoaderIcon } from 'markup/icons'
import { Horizontal, Text } from 'tags'

export const Loader = () => (
  <Horizontal style="minHeight-[10vh] alignSelf-center">
    <LoaderIcon />
    <Text>Loading...</Text>
  </Horizontal>
)
export const Alert = ({ message }: { message: string | boolean }) => (
  <Horizontal style="borderColor-error borderWidth-[2px] borderStyle-solid radius-medium padding-medium background-gray200">
    <Text style="color-error">🚨 Error: {typeof message === 'string' ? message : 'An unknown error occurred!'}</Text>
  </Horizontal>
)
