import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Switch } from '@/components/Switch'

describe('Checkbox test cases', () => {
  it('Render check', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)

    const onChange = jest.fn()
    const element = <Switch onChange={onChange} />
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    const onChange = jest.fn()
    const element = <Switch onChange={onChange} />

    render(element)
    await userEvent.click(screen.getByTestId('SwitchVisiblePart'))
    expect(onChange).toHaveBeenCalled()
  })
})
