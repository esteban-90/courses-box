import { Icon } from '@/components/Icon'
import { render } from '@/tests/utils'

describe('Icon test cases:', () => {
  it('should check render', () => {
    const iconElement = <Icon name='Moon' />
    const { asFragment } = render(iconElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
