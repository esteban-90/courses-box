import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { IconButton } from '@/components/IconButton'

describe('IconButton test cases', () => {
  it('Render check', () => {
    const clickHandler = jest.fn()

    const element = (
      <IconButton onClick={clickHandler} name='Home'>
        Button
      </IconButton>
    )

    const { asFragment } = render(element)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onClick callback', async () => {
    const clickHandler = jest.fn()

    const element = (
      <IconButton onClick={clickHandler} name='Home'>
        Button
      </IconButton>
    )

    render(element)
    await userEvent.click(screen.getByRole('button'))
    expect(clickHandler).toHaveBeenCalled()
  })
})
