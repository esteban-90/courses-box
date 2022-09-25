import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import Login from '@/pages/login'

describe('Login Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Login />)
    const loginForm = screen.getByTestId('loginForm')

    expect(container).toMatchSnapshot()
    expect(loginForm).toHaveFormValues({ email: '', password: '' })
  })

  it('Client validation check', async () => {
    render(<Login />)

    const submitButton = screen.getByRole('button', { name: 'Enter' })
    await act(async () => await userEvent.click(submitButton))

    const requiredEmailFeedback = screen.getByText('Email is required')
    const requiredPasswordFeedback = screen.getByText('Password is required')

    expect(requiredEmailFeedback).toBeInTheDocument()
    expect(requiredPasswordFeedback).toBeInTheDocument()

    const emailField = screen.getByTestId('loginEmail')
    const passwordField = screen.getByTestId('loginPassword')

    await act(async () => {
      await userEvent.type(emailField, 'test')
      await userEvent.type(passwordField, 'test')
    })

    const invalidEmailFeedback = screen.getByText('Email is not valid')
    const invalidPasswordFeedback = screen.getByText('Password is not strong enough')

    expect(invalidEmailFeedback).toBeInTheDocument()
    expect(invalidPasswordFeedback).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(emailField, 'test@example.com')
      await userEvent.type(passwordField, 'Test1234*')
    })

    const validFeedbacks = screen.getAllByRole('alert')
    const [emailValidFeedback, passwordValidFeedback] = validFeedbacks

    expect(validFeedbacks).toHaveLength(2)
    expect(emailValidFeedback).toMatchSnapshot()
    expect(passwordValidFeedback).toMatchSnapshot()
  })
})
