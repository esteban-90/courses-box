import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Checkbox } from '@/components/Checkbox'

describe('Checkbox test cases', () => {
  it('Render check', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)

    const changeHandler = jest.fn()
    const element = <Checkbox onChange={changeHandler} />
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    const changeHandler = jest.fn()
    const element = <Checkbox onChange={changeHandler} />

    render(element)
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    expect(changeHandler).toHaveBeenCalled()
  })
})
