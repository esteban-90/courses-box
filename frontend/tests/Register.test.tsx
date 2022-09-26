import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import Register from '@/pages/register'

describe('Register Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Register />)
    const registerForm = screen.getByTestId('registerForm')

    expect(container).toMatchSnapshot()
    expect(registerForm).toHaveFormValues({ email: '', password: '', passwordConfirmation: '' })
  })

  it('Client validation check', async () => {
    render(<Register />)

    const submitButton = screen.getByRole('button', { name: 'Done' })
    await act(async () => await userEvent.click(submitButton))

    const requiredUsernameFeedback = screen.getByText('Username is required')
    const requiredEmailFeedback = screen.getByText('Email is required')
    const requiredPasswordFeedback = screen.getByText('Password is required')

    expect(requiredUsernameFeedback).toBeInTheDocument()
    expect(requiredEmailFeedback).toBeInTheDocument()
    expect(requiredPasswordFeedback).toBeInTheDocument()

    const usernameField = screen.getByTestId('registerUsername')
    const emailField = screen.getByTestId('registerEmail')
    const passwordField = screen.getByTestId('registerPassword')
    const passConfirmField = screen.getByTestId('registerPasswordConfirmation')

    await act(async () => {
      await userEvent.type(usernameField, 'test')
      await userEvent.type(emailField, 'test')
      await userEvent.type(passwordField, 'test')
    })

    const invalidUsernameFeedback = screen.getByText('Username is not valid')
    const invalidEmailFeedback = screen.getByText('Email is not valid')
    const invalidPasswordFeedback = screen.getByText('Password is not strong enough')

    expect(invalidUsernameFeedback).toBeInTheDocument()
    expect(invalidEmailFeedback).toBeInTheDocument()
    expect(invalidPasswordFeedback).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(passwordField, 'test')
      await userEvent.type(passConfirmField, 'jest')
    })

    const invalidPassConfirmFeedback = screen.getByText('Passwords must match')
    expect(invalidPassConfirmFeedback).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(usernameField, 'mytest1234')
      await userEvent.type(emailField, 'test@example.com')
      await userEvent.type(passwordField, 'Test1234*')
      await userEvent.type(passConfirmField, 'Test1234*')
    })

    const validFeedbacks = screen.getAllByRole('alert')
    const [usernameValidFeedback, emailValidFeedback, passwordValidFeedback, passConfirmValidFeedback] = validFeedbacks

    expect(validFeedbacks).toHaveLength(4)
    expect(usernameValidFeedback).toMatchSnapshot()
    expect(emailValidFeedback).toMatchSnapshot()
    expect(passwordValidFeedback).toMatchSnapshot()
    expect(passConfirmValidFeedback).toMatchSnapshot()
  })
})
