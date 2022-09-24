import { render } from '@/test-utils'
import { Icon } from '@/components/Icon'

describe('Icon test cases', () => {
  it('Render check', () => {
    const element = <Icon name='Moon' />
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })
})
