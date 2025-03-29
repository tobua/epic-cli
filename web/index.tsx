import { render } from 'epic-jsx'
import { plugin } from 'epic-state'
import { connect } from 'epic-state/connect'
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
        <Lead>EPIC CLI</Lead>
      </Header>
      <Content>
        <Tabs />
        <Scripts />
      </Content>
    </>
  )
}

render(<App />)
