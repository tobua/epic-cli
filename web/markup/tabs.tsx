import { State } from 'data/index'
import { tag } from 'epic-tag'
import { error, loading } from 'markup/plugins'
import { Button, Text } from 'tags'

const TabWrapper = tag('div', 'flex')

export function Tabs() {
  this.plugin([loading(State.loading), error(State.error)])

  return (
    <TabWrapper>
      {State.tabs.map((tab) => (
        <Text>
          {tab.name} - {tab.folder}
        </Text>
      ))}
      <Button>Add</Button>
    </TabWrapper>
  )
}
