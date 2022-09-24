import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import Login from '@/pages/login'

describe('Login Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('login-form')).toHaveFormValues({ email: '', password: '' })
  })

  it('Client validation check', async () => {
    render(<Login />)

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    })

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: 'Email Email is required' }), 'test')
    })

    expect(screen.getByText('Email is not valid')).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: 'Password Password is required' }), 'test')
    })

    expect(screen.getByText('Email is not valid')).toBeInTheDocument()
    expect(screen.getByText('Password is not strong enough')).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: 'Email Email is not valid' }), 'test@example.com')
      await userEvent.type(screen.getByRole('textbox', { name: 'Password Password is not strong enough' }), 'Test1234*')
    })

    const [alert1, alert2] = screen.getAllByRole('alert')

    expect(alert1).toMatchSnapshot()
    expect(alert2).toMatchSnapshot()
  })
})
