import { render } from 'epic-jsx'
import { list, plugin, state } from 'epic-state'
import { connect } from 'epic-state/connect'
import { tag } from 'epic-tag'
import { styles } from 'style'

styles()
plugin(connect)

const Header = tag('header', 'flex center m-huge')
const Content = tag('main', 'flex col gap-medium p-large center')
const Text = tag('p', 'normal')
const Lead = tag(Text, 'fontSize-lead bold color-highlight')
const Button = tag('button', 'button bg-interact color-white p-medium r-large', {
  hover: 'bg-lightgray color-black',
  press: 'bg-highlight color-white',
})
export const Horizontal = tag('div', 'flex gap-medium alignItems-center', {
  center: 'justifyContent-center',
})
const TabWrapper = tag('div', 'flex')

const State = state({
  tabs: list((tab: { location: string }) => tab, []),
})

const Scripts = () => (
  <Horizontal>
    <Button>Start</Button>
    <Button>Update</Button>
    <Button>Build</Button>
  </Horizontal>
)

function Tabs() {
  return (
    <TabWrapper>
      {State.tabs.map((tab) => (
        <Text>{tab.location}</Text>
      ))}
      <Button>Add</Button>
    </TabWrapper>
  )
}

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
