import userEvent from '@testing-library/user-event'
import { Checkbox } from '@/components/Checkbox'
import { render, screen } from '@/tests/utils'

describe('Checkbox test cases:', () => {
  const changeHandler = jest.fn()
  const checkboxElement = <Checkbox changeHandler={changeHandler} />

  it('should check render', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)
    const { asFragment } = render(checkboxElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check onChange callback', async () => {
    render(checkboxElement)
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    expect(changeHandler).toHaveBeenCalled()
  })
})
