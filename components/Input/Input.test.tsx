import { ChangeEventHandler } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/test-utils'
import { Input } from './Input'

describe('Input test cases', () => {
  it('Render check', () => {
    const onChange = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
    const { asFragment } = render(<Input label='Label' placeholder='Placeholder' onChange={onChange} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Render check with icon', () => {
    const onChange = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>
    const { asFragment } = render(<Input label='Label' placeholder='Placeholder' icon='Search' onChange={onChange} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Check onChange callback', async () => {
    const onChange = jest.fn() as unknown as ChangeEventHandler<HTMLInputElement>

    render(<Input label='Label' placeholder='Placeholder' onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'String')
    expect(onChange).toHaveBeenCalledTimes(6)
  })
})
