import { ChangeEventHandler } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Input } from '@/components/Input'

describe('Input test cases', () => {
  const changeHandler = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
  const inputElement = <Input label='Label' placeholder='Placeholder' onChange={changeHandler} />

  it('Render check', () => {
    const { asFragment } = render(inputElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Render check with icon', () => {
    const inputWithIconElement = (
      <Input label='Label' placeholder='Placeholder' icon='Search' onChange={changeHandler} />
    )

    const { asFragment } = render(inputWithIconElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    render(inputElement)
    await userEvent.type(screen.getByRole('textbox'), 'String')
    expect(changeHandler).toHaveBeenCalledTimes(6)
  })
})
