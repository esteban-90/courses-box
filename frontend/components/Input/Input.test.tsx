import { ChangeEventHandler } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Input } from '@/components/Input'

describe('Input test cases', () => {
  it('Render check', () => {
    const changeHandler = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
    const element = <Input label='Label' placeholder='Placeholder' onChange={changeHandler} />
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Render check with icon', () => {
    const changeHandler = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
    const element = <Input label='Label' placeholder='Placeholder' icon='Search' onChange={changeHandler} />
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    const changeHandler = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
    const element = <Input label='Label' placeholder='Placeholder' onChange={changeHandler} />

    render(element)
    await userEvent.type(screen.getByRole('textbox'), 'String')
    expect(changeHandler).toHaveBeenCalledTimes(6)
  })
})
