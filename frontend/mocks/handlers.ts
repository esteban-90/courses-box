import { rest } from 'msw'
import { apiUrl } from '@/config'
import { mockUser, mockPassword, mockLoginError, mockRegisterError } from '@/mocks/users'
import type { LoginData, RegisterData } from '@/types'

const { jwt, user } = mockUser
const { email: mockEmail, username: mockUsername } = user

export const handlers = [
  rest.post<RegisterData>(`${apiUrl}/auth/local/register`, (request, response, context) => {
    const { email, username, password } = request.body
    const ok = email === mockEmail && username === mockUsername && password === mockPassword
    const status = ok ? 200 : 400
    const data = ok ? mockUser : mockRegisterError

    return response(context.status(status), context.json(data))
  }),

  rest.post<LoginData>(`${apiUrl}/auth/local`, (request, response, context) => {
    const { identifier, password } = request.body
    const ok = identifier === mockEmail && password === mockPassword
    const status = ok ? 200 : 400
    const data = ok ? mockUser : mockLoginError

    return response(context.status(status), context.json(data))
  }),

  rest.get(`${apiUrl}/users/me`, (request, response, context) => {
    const ok = request.headers.get('Authorization') === `Bearer ${jwt}`
    const status = ok ? 200 : 400
    const data = ok ? user : mockLoginError

    return response(context.status(status), context.json(data))
  }),
]
