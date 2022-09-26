import { render } from '@/test-utils'
import { Icon } from '@/components/Icon'

describe('Icon test cases', () => {
  it('Render check', () => {
    const iconElement = <Icon name='Moon' />
    const { asFragment } = render(iconElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
