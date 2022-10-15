import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import Login from '@/pages/login'
import { mockUser, mockPassword, mockLoginError } from '@/mocks/users'
import { pageRender as render, screen, act, waitFor } from '@/tests/utils'
import type { LoginData } from '@/types'
import { messages } from '@/validations'

describe('Login Page test cases:', () => {
  it('should check render', () => {
    const { container } = render(<Login />)
    const loginForm = screen.getByTestId('form')
    const loginData: LoginData = { identifier: '', password: '' }

    expect(container).toMatchSnapshot()
    expect(loginForm).toHaveFormValues(loginData)
  })

  describe('Validations:', () => {
    beforeEach(async () => {
      render(<Login />)
      await screen.findByText('Login Page')
    })

    it('should validate from client side', async () => {
      const submitButton = screen.getByRole('button', { name: 'Enter' })

      await act(async () => {
        await userEvent.click(submitButton)
      })

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

      await act(async () => {
        await userEvent.type(identifierField, '@')
      })

      const invalidEmailFeedback = screen.getByText(messages.invalid.email)
      expect(invalidEmailFeedback).toBeInTheDocument()

      await act(async () => {
        await userEvent.type(identifierField, 'test@example.com')
        await userEvent.type(passwordField, 'Test1234**')
      })

      const feedbacks = screen.getAllByRole('alert')
      expect(feedbacks).toHaveLength(3)

      for (const feedback of feedbacks) {
        expect(feedback).toMatchSnapshot()
      }
    })

    it('should validate from server side', async () => {
      const submitButton = screen.getByRole('button', { name: 'Enter' })
      const identifierField = screen.getByTestId('identifier')
      const passwordField = screen.getByTestId('password')

      await act(async () => {
        await userEvent.type(identifierField, 'wrongtest@example.com')
        await userEvent.type(passwordField, 'WrongPsw1*')
        await userEvent.click(submitButton)
      })

      const invalidFeedback = await screen.findByText(mockLoginError.error.message)
      expect(invalidFeedback).toBeInTheDocument()
    })

    it('should redirect to profile page if validation passes', async () => {
      const push = jest.fn()
      void (useRouter as jest.Mock).mockReturnValue({ query: {}, push })

      const submitButton = screen.getByRole('button', { name: 'Enter' })
      const identifierField = screen.getByTestId('identifier')
      const passwordField = screen.getByTestId('password')

      await act(async () => {
        await userEvent.type(identifierField, mockUser.user.email)
        await userEvent.type(passwordField, mockPassword)
        await userEvent.click(submitButton)
      })

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith('/profile')
      })
    })
  })
})
