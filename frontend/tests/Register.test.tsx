import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import Register from '@/pages/register'
import { messages } from '@/validations'

describe('Register Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Register />)
    const registerForm = screen.getByTestId('form')

    expect(container).toMatchSnapshot()
    expect(registerForm).toHaveFormValues({ email: '', password: '', passwordConfirmation: '' })
  })

  it('Client validation check', async () => {
    render(<Register />)

    const submitButton = screen.getByRole('button', { name: 'Done' })
    await act(async () => await userEvent.click(submitButton))

    const requiredFeedbacks = screen.getAllByText(messages.required.field)
    expect(requiredFeedbacks).toHaveLength(3)

    const usernameField = screen.getByTestId('username')
    const emailField = screen.getByTestId('email')
    const passwordField = screen.getByTestId('password')
    const passConfirmField = screen.getByTestId('passwordConfirmation')

    await act(async () => {
      await userEvent.type(usernameField, 'test')
      await userEvent.type(emailField, 'test')
      await userEvent.type(passwordField, 'test')
    })

    const invalidUsernameFeedback = screen.getByText(messages.invalid.username)
    const invalidEmailFeedback = screen.getByText(messages.invalid.email)
    const invalidPasswordFeedback = screen.getByText(messages.invalid.password)

    expect(invalidUsernameFeedback).toBeInTheDocument()
    expect(invalidEmailFeedback).toBeInTheDocument()
    expect(invalidPasswordFeedback).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(passwordField, 'test')
      await userEvent.type(passConfirmField, 'jest')
    })

    const invalidPassConfirmFeedback = screen.getByText(messages.invalid.passwordConfirmation)
    expect(invalidPassConfirmFeedback).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(usernameField, 'Mytest12')
      await userEvent.type(emailField, 'test@example.com')
      await userEvent.type(passwordField, 'Test1234**')
      await userEvent.type(passConfirmField, 'Test1234**')
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
