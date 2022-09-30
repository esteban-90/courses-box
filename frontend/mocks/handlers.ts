import { rest } from 'msw'
import { mockUser, LoginError, RegisterError } from '@/mocks/user'
import { LoginData, RegisterData } from '@/types'

const apiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL

export const handlers = [
  rest.post<Partial<LoginData>>(`${apiURL}/auth/local`, (request, response, context) => {
    const { identifier, password } = request.body
    const isSuccess = identifier === mockUser.user.email && password === mockUser.user.password

    return response(context.status(isSuccess ? 200 : 400), context.json(isSuccess ? mockUser : LoginError))
  }),

  rest.get(`${apiURL}/users/me`, (request, response, context) => {
    const isSuccess = request.headers.get('Authorization') === `Bearer ${mockUser.jwt}`
    return response(context.status(isSuccess ? 200 : 400), context.json(isSuccess ? mockUser.user : LoginError))
  }),

  rest.post<RegisterData>(`${apiURL}/auth/local/register`, (request, response, context) => {
    const { email, username, password } = request.body

    const isSuccess =
      email === mockUser.user.email && username === mockUser.user.username && password === mockUser.user.password

    return response(context.status(isSuccess ? 200 : 400), context.json(isSuccess ? mockUser : RegisterError))
  }),
]
