import { render } from 'epic-jsx'
import { plugin } from 'epic-state'
import { connect } from 'epic-state/connect'
import { EnvrionmentVariables } from 'markup/environment-variables'
import { Input } from 'markup/input'
import { Output } from 'markup/output'
import { Tabs } from 'markup/tabs'
import { styles } from 'style'
import { Button, Content, Header, Horizontal, Lead } from 'tags'

plugin(connect)
styles()

const Scripts = () => (
  <Horizontal>
    <Button>Start</Button>
    <Button>Update</Button>
    <Button>Build</Button>
  </Horizontal>
)

function App() {
  return (
    <>
      <Header>
        <Horizontal style="flex1 alignItems-center justifyContent-space-between">
          <Lead>EPIC CLI</Lead>
          <Button>Environment Variables</Button>
        </Horizontal>
      </Header>
      <Content>
        <Tabs />
        <Scripts />
        <Output />
        <Input />
        <EnvrionmentVariables />
      </Content>
    </>
  )
}

render(<App />)
