import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Button } from './Button'

describe('Button test cases', () => {
  it('Render check', () => {
    const onClick = jest.fn()
    const { asFragment } = render(<Button onClick={onClick}>Click here</Button>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onClick callback', async () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Click here</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
