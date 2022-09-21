import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Switch } from './Switch'

describe('Checkbox test cases', () => {
  it('Render check', () => {
    const onChange = jest.fn()
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)
    const { asFragment } = render(<Switch onChange={onChange} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    const onChange = jest.fn()

    render(<Switch onChange={onChange} />)
    await userEvent.click(screen.getByTestId('SwitchVisiblePart'))
    expect(onChange).toHaveBeenCalled()
  })
})
