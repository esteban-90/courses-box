import userEvent from '@testing-library/user-event'
import { IconButton } from '@/components/IconButton'
import { render, screen } from '@/utils'

describe('IconButton test cases', () => {
  const clickHandler = jest.fn()

  const iconButtonElement = (
    <IconButton onClick={clickHandler} name='Home'>
      Button
    </IconButton>
  )

  it('Render check', () => {
    const { asFragment } = render(iconButtonElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onClick callback', async () => {
    render(iconButtonElement)
    await userEvent.click(screen.getByRole('button'))
    expect(clickHandler).toHaveBeenCalled()
  })
})
