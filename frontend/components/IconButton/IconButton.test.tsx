import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { IconButton } from './IconButton'

describe('IconButton test cases', () => {
  it('Render check', () => {
    const onClick = jest.fn()
    const { asFragment } = render(
      <IconButton onClick={onClick} name='Home'>
        Button
      </IconButton>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onClick callback', async () => {
    const onClick = jest.fn()

    render(
      <IconButton onClick={onClick} name='Home'>
        Button
      </IconButton>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
