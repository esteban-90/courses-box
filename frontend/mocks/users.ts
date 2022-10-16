import type { UserPayload, ErrorPayload } from '@/types'

export const createMockUser = (data: Partial<UserPayload['user']> = {}): UserPayload => {
  const { id, email, username, provider, confirmed, blocked, createdAt, updatedAt } = data

  return {
    jwt: 'a661b50f052ab1e1868b90091195c96d416ce03dd1b001a5d0a48e56e3bf2a21e8065fe863cbf2d9fb4297d0b496e6ef76c8e13275d7a4b0936fa7737a0055eeea9c1887036625db73ebe08df028b4d5275e8d3c67cb3fd3958af40492995dea365221db37c879ee42ba507feac205a4c075cb4888544a85da71b3f3a3282658',
    user: {
      id: id ?? 1,
      email: email ?? 'tester@example.com',
      username: username ?? 'Tester',
      provider: provider ?? 'local',
      confirmed: confirmed ?? true,
      blocked: blocked ?? false,
      createdAt: createdAt ?? '2022-09-26T02:07:33.493Z',
      updatedAt: updatedAt ?? '2022-09-26T02:07:33.493Z',
    },
  }
}

export const createMockError = (data: Partial<ErrorPayload['error']> = {}): ErrorPayload => {
  const { status, name, message, details } = data

  return {
    data: null,
    error: {
      status: status ?? 400,
      name: name ?? '',
      message: message ?? '',
      details: details ?? {},
    },
  }
}

export const mockUser = createMockUser()
export const mockPassword = 'TestPsw12*'

export const mockLoginError = createMockError({
  name: 'ValidationError',
  message: 'Invalid identifier or password',
})

export const mockRegisterError = createMockError({
  name: 'ApplicationError',
  message: 'Email or Username are already taken',
})
