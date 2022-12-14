import userEvent from '@testing-library/user-event'
import Register from '@/pages/register'
import { pageRender as render, screen, act } from '@/utils'
import { messages } from '@/validations'

describe('Register Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Register />)
    const registerForm = screen.getByTestId('form')

    expect(container).toMatchSnapshot()
    expect(registerForm).toHaveFormValues({ username: '', email: '', password: '', passwordConfirmation: '' })
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

    const feedbacks = screen.getAllByRole('alert')

    expect(feedbacks).toHaveLength(5)
    expect(feedbacks[0]).toMatchSnapshot()
    expect(feedbacks[1]).toMatchSnapshot()
    expect(feedbacks[2]).toMatchSnapshot()
    expect(feedbacks[3]).toMatchSnapshot()
    expect(feedbacks[4]).toMatchSnapshot()
  })
})
