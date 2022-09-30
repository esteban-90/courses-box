import userEvent from '@testing-library/user-event'
import Login from '@/pages/login'
import { pageRender as render, screen, act } from '@/utils'
import { messages } from '@/validations'

describe('Login Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Login />)
    const loginForm = screen.getByTestId('form')

    expect(container).toMatchSnapshot()
    expect(loginForm).toHaveFormValues({ identifier: '', password: '' })
  })

  it('Client validation check', async () => {
    render(<Login />)

    const submitButton = screen.getByRole('button', { name: 'Enter' })
    await act(async () => await userEvent.click(submitButton))

    const requiredFeedbacks = screen.getAllByText(messages.required.field)
    expect(requiredFeedbacks).toHaveLength(2)

    const identifierField = screen.getByTestId('identifier')
    const passwordField = screen.getByTestId('password')

    await act(async () => {
      await userEvent.type(identifierField, 'test')
      await userEvent.type(passwordField, 'test')
    })

    const invalidUsernameFeedback = screen.getByText(messages.invalid.username)
    const invalidPasswordFeedback = screen.getByText(messages.invalid.password)

    expect(invalidUsernameFeedback).toBeInTheDocument()
    expect(invalidPasswordFeedback).toBeInTheDocument()

    await act(async () => await userEvent.type(identifierField, '@'))
    const invalidEmailFeedback = screen.getByText(messages.invalid.email)
    expect(invalidEmailFeedback).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(identifierField, 'test@example.com')
      await userEvent.type(passwordField, 'Test1234**')
    })

    const feedbacks = screen.getAllByRole('alert')

    expect(feedbacks).toHaveLength(3)
    expect(feedbacks[0]).toMatchSnapshot()
    expect(feedbacks[1]).toMatchSnapshot()
    expect(feedbacks[2]).toMatchSnapshot()
  })
})
