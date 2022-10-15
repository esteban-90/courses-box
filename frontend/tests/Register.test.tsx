import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import Register from '@/pages/register'
import { mockUser, mockPassword, mockRegisterError } from '@/mocks/users'
import { pageRender as render, screen, act, waitFor } from '@/tests/utils'
import type { RegisterData } from '@/types'
import { messages } from '@/validations'

describe('Register Page test cases:', () => {
  it('should check render', () => {
    const { container } = render(<Register />)
    const registerForm = screen.getByTestId('form')
    const registerData: RegisterData = { username: '', email: '', password: '', passwordConfirmation: '' }

    expect(container).toMatchSnapshot()
    expect(registerForm).toHaveFormValues(registerData)
  })

  describe('Validations:', () => {
    beforeEach(async () => {
      render(<Register />)
      await screen.findByText('Register Page')
    })

    it('should validate from client side', async () => {
      const submitButton = screen.getByRole('button', { name: 'Done' })

      await act(async () => {
        await userEvent.click(submitButton)
      })

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

      for (const feedback of feedbacks) {
        expect(feedback).toMatchSnapshot()
      }
    })

    it('should validate from server side', async () => {
      const submitButton = screen.getByRole('button', { name: 'Done' })
      const usernameField = screen.getByTestId('username')
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const passConfirmField = screen.getByTestId('passwordConfirmation')

      await act(async () => {
        await userEvent.type(usernameField, 'Baduser')
        await userEvent.type(emailField, 'wrongtest@example.com')
        await userEvent.type(passwordField, 'WrongPsw1*')
        await userEvent.type(passConfirmField, 'WrongPsw1*')
        await userEvent.click(submitButton)
      })

      const invalidFeedback = await screen.findByText(mockRegisterError.error.message)
      expect(invalidFeedback).toBeInTheDocument()
    })

    it('should redirect to profile page if validation passes', async () => {
      const push = jest.fn()
      void (useRouter as jest.Mock).mockReturnValue({ query: {}, push })

      const submitButton = screen.getByRole('button', { name: 'Done' })
      const usernameField = screen.getByTestId('username')
      const emailField = screen.getByTestId('email')
      const passwordField = screen.getByTestId('password')
      const passConfirmField = screen.getByTestId('passwordConfirmation')

      await act(async () => {
        await userEvent.type(usernameField, mockUser.user.username)
        await userEvent.type(emailField, mockUser.user.email)
        await userEvent.type(passwordField, mockPassword)
        await userEvent.type(passConfirmField, mockPassword)
        await userEvent.click(submitButton)
      })

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith('/profile')
      })
    })
  })
})
