import { Icon } from '@/components/Icon'
import { render } from '@/utils'

describe('Icon test cases', () => {
  it('Render check', () => {
    const iconElement = <Icon name='Moon' />
    const { asFragment } = render(iconElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
