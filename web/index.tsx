import { render } from 'epic-jsx'
import { plugin, setTo, state } from 'epic-state'
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
  this.state = state(() => ({
    tab: 'terminal' as 'terminal' | 'environment-variables',
  }))

  return (
    <>
      <Header>
        <Horizontal style="flex1 alignItems-center justifyContent-space-between">
          <Lead>EPIC CLI</Lead>
          <Horizontal>
            <Button bold={this.state.tab === 'terminal'} onClick={setTo(this.state, 'tab', 'terminal')}>
              Terminal
            </Button>
            <Button bold={this.state.tab === 'environment-variables'} onClick={setTo(this.state, 'tab', 'environment-variables')}>
              Environment Variables
            </Button>
          </Horizontal>
        </Horizontal>
      </Header>
      <Content>
        {this.state.tab === 'terminal' && (
          <>
            <Tabs />
            <Scripts />
            <Output />
            <Input />
          </>
        )}
        {this.state.tab === 'environment-variables' && <EnvrionmentVariables />}
      </Content>
    </>
  )
}

render(<App />)
