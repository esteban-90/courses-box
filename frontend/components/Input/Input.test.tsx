import type { ChangeEventHandler } from 'react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/Input'
import { render, screen } from '@/tests/utils'

describe('Input test cases:', () => {
  const changeHandler = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
  const inputElement = <Input label='Label' placeholder='Placeholder' onChange={changeHandler} />

  it('should check render', () => {
    const { asFragment } = render(inputElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check render with icon', () => {
    const inputWithIconElement = (
      <Input label='Label' placeholder='Placeholder' icon='Search' onChange={changeHandler} />
    )

    const { asFragment } = render(inputWithIconElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check onChange callback', async () => {
    render(inputElement)
    await userEvent.type(screen.getByRole('textbox'), 'String')
    expect(changeHandler).toHaveBeenCalledTimes(6)
  })
})
