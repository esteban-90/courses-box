import { Feedback } from '@/components/Input'
import { render } from '@/tests/utils'

describe('Feedback test cases:', () => {
  it('should check render for valid feedback', () => {
    const validFeedbackElement = <Feedback isValid>Looks good!</Feedback>
    const { asFragment } = render(validFeedbackElement)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should check render for invalid feedback', () => {
    const invalidFeedbackElement = <Feedback>Please provide a valid value</Feedback>
    const { asFragment } = render(invalidFeedbackElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
