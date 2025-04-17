import { State } from 'data/index'
import { tag } from 'epic-tag'
import { error, loading } from 'markup/plugins'
import { Text, Vertical } from 'tags'

const Wrapper = tag('form', 'flex column gap-large fullWidth relative shadow-small p-medium r-large')
const Project = tag('div', 'flex column gap-medium')

export function EnvrionmentVariables() {
  this.plugin([loading(State.variables.loading), error(State.variables.error)])

  return (
    <Wrapper>
      {Object.keys(State.variables.data).map((project) => (
        <Project>
          <Text bold={true}>{project}</Text>
          <Vertical>
            {Object.entries(State.variables.data[project]).map(([key, value]) => (
              <Text>
                {key} - {value}
              </Text>
            ))}
          </Vertical>
        </Project>
      ))}
    </Wrapper>
  )
}
