import { render } from '@/test-utils'
import { Feedback } from '@/components/Input'

describe('Feedback test cases', () => {
  it('Render check for valid', () => {
    const element = <Feedback isValid>Looks good!</Feedback>
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Render check for invalid', () => {
    const element = <Feedback>Please provide a valid value</Feedback>
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })
})
