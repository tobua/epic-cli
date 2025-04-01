import { State } from 'data/index'
import type { Component } from 'epic-jsx'
import { tag } from 'epic-tag'

const Wrapper = tag('pre', 'flex fullWidth flex1 bg-gray p-medium r-large')

export function Output(this: Component<undefined, 'output'>) {
  this.once(() => {
    State.connect(this.ref.output.native)
  })

  return <Wrapper ref="output" />
}
