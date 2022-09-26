import { render } from '@/test-utils'
import { Feedback } from '@/components/Input'

describe('Feedback test cases', () => {
  it('Render check for valid', () => {
    const validFeedbackElement = <Feedback isValid>Looks good!</Feedback>
    const { asFragment } = render(validFeedbackElement)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Render check for invalid', () => {
    const invalidFeedbackElement = <Feedback>Please provide a valid value</Feedback>
    const { asFragment } = render(invalidFeedbackElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
