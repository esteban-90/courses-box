import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import Login from '@/pages/login'

describe('Login Page test cases', () => {
  it('Render check', () => {
    const { container } = render(<Login />)
    const loginForm = screen.getByTestId('loginForm')

    expect(container).toMatchSnapshot()
    expect(loginForm).toHaveFormValues({ identifier: '', password: '' })
  })

  it('Client validation check', async () => {
    render(<Login />)

    const submitButton = screen.getByRole('button', { name: 'Enter' })
    await act(async () => await userEvent.click(submitButton))

    const requiredIdentifierFeedback = screen.getByText('Identifier is required')
    const requiredPasswordFeedback = screen.getByText('Password is required')

    expect(requiredIdentifierFeedback).toBeInTheDocument()
    expect(requiredPasswordFeedback).toBeInTheDocument()

    const identifierField = screen.getByTestId('loginIdentifier')
    const passwordField = screen.getByTestId('loginPassword')

    await act(async () => {
      await userEvent.type(identifierField, 'test@example.com')
      await userEvent.type(passwordField, 'Test1234*')
    })

    const validFeedbacks = screen.getAllByRole('alert')
    const [identifierValidFeedback, passwordValidFeedback] = validFeedbacks

    expect(validFeedbacks).toHaveLength(2)
    expect(identifierValidFeedback).toMatchSnapshot()
    expect(passwordValidFeedback).toMatchSnapshot()
  })
})
