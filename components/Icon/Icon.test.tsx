import { render } from '@/test-utils'
import { Icon } from './Icon'

describe('Icon test cases', () => {
  it('Render check', () => {
    const { asFragment } = render(<Icon name='Moon' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
