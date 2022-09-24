import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Button } from '@/components/Button'

describe('Button test cases', () => {
  it('Render check', () => {
    const clickHandler = jest.fn()
    const element = <Button onClick={clickHandler}>Click here</Button>
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onClick callback', async () => {
    const clickHandler = jest.fn()
    const element = <Button onClick={clickHandler}>Click here</Button>

    render(element)
    await userEvent.click(screen.getByRole('button'))
    expect(clickHandler).toHaveBeenCalled()
  })
})
