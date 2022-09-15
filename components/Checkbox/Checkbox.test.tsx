import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Checkbox } from './Checkbox'

describe('Checkbox test cases', () => {
  it('Render check', () => {
    const onChange = jest.fn()
    jest.spyOn(Math, 'random').mockReturnValue(0.999_999_999)
    const { asFragment } = render(<Checkbox onChange={onChange} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    const onChange = jest.fn()

    render(<Checkbox onChange={onChange} />)
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    expect(onChange).toHaveBeenCalled()
  })
})
