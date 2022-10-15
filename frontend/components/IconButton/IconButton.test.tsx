import userEvent from '@testing-library/user-event'
import { IconButton } from '@/components/IconButton'
import { render, screen } from '@/tests/utils'

describe('IconButton test cases:', () => {
  const clickHandler = jest.fn()

  const iconButtonElement = (
    <IconButton onClick={clickHandler} name='Home'>
      Button
    </IconButton>
  )

  it('should check render', () => {
    const { asFragment } = render(iconButtonElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check onClick callback', async () => {
    render(iconButtonElement)
    await userEvent.click(screen.getByRole('button'))
    expect(clickHandler).toHaveBeenCalled()
  })
})
