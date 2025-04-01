import { State } from 'data/index'
import { setValue, state } from 'epic-state'
import { tag } from 'epic-tag'

const InputState = state({
  input: '',
})

const Wrapper = tag('form', 'flex fullWidth relative shadow-small p-medium r-large')
const Element = tag('input', 'input mono flex flex1')
const Button = tag('button', 'button absolute right-small')

export function Input() {
  return (
    <Wrapper
      onSubmit={(event) => {
        event.preventDefault()
        State.run(InputState.input)
        InputState.input = ''
      }}
    >
      <Element placeholder="Command" value={InputState.input} onChange={setValue(InputState, 'input')} />
      <Button type="submit">↩</Button>
    </Wrapper>
  )
}
