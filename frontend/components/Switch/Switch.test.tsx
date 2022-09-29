import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/Switch'
import { render, screen } from '@/utils'

describe('Checkbox test cases', () => {
  const changeHandler = jest.fn()
  const switchElement = <Switch onChange={changeHandler} />

  it('Render check', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)
    const { asFragment } = render(switchElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    render(switchElement)
    await userEvent.click(screen.getByTestId('switchVisiblePart'))
    expect(changeHandler).toHaveBeenCalled()
  })
})
