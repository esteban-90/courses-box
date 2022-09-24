import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import Login from '@/pages/login'

describe('Login Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })

  it('Client validation check', async () => {
    render(<Login />)

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    })

    expect(screen.getAllByText('This field is required')).toHaveLength(2)

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: 'Identifier This field is required' }), 'test')
    })

    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('Too short, min length: 6')).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: 'Password This field is required' }), 'test')
    })

    expect(screen.getByText('Too short, min length: 6')).toBeInTheDocument()
    expect(screen.getByText('Too short, min length: 8')).toBeInTheDocument()

    await act(async () => {
      userEvent.type(screen.getByRole('textbox', { name: 'Identifier Too short, min length: 6' }), 'test@example.com')
      userEvent.type(screen.getByRole('textbox', { name: 'Password Too short, min length: 8' }), 'testtest!')
    })

    const [alert1, alert2] = screen.getAllByRole('alert')

    expect(alert1).toMatchSnapshot()
    expect(alert2).toMatchSnapshot()
  })
})
