import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Checkbox } from '@/components/Checkbox'

describe('Checkbox test cases', () => {
  const changeHandler = jest.fn()
  const checkboxElement = <Checkbox onChange={changeHandler} />

  it('Render check', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)
    const { asFragment } = render(checkboxElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    render(checkboxElement)
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    expect(changeHandler).toHaveBeenCalled()
  })
})
