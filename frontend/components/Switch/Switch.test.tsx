import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/Switch'
import { render, screen } from '@/tests/utils'

describe('Switch test cases:', () => {
  const changeHandler = jest.fn()
  const switchElement = <Switch changeHandler={changeHandler} />

  it('should check render', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)
    const { asFragment } = render(switchElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check onChange callback', async () => {
    render(switchElement)
    await userEvent.click(screen.getByTestId('switchVisiblePart'))
    expect(changeHandler).toHaveBeenCalled()
  })
})
