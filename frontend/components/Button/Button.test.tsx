import userEvent from '@testing-library/user-event'
import { Button } from '@/components/Button'
import { render, screen } from '@/utils'

describe('Button test cases', () => {
  const clickHandler = jest.fn()
  const buttonElement = <Button onClick={clickHandler}>Click here</Button>

  it('Render check', () => {
    const { asFragment } = render(buttonElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onClick callback', async () => {
    render(buttonElement)
    await userEvent.click(screen.getByRole('button'))
    expect(clickHandler).toHaveBeenCalled()
  })
})
