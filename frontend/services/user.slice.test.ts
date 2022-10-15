import { initialState } from '@/services/user.slice'
import { register, login, getMe, logout } from '@/services/user.slice'
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from '@/services/user.slice'
import { mockUser, mockPassword, mockLoginError, mockRegisterError } from '@/mocks/users'
import { store } from '@/store'
import type { UserState, LoginData, RegisterData } from '@/types'

const validRegisterData: RegisterData = {
  username: mockUser.user.username,
  email: mockUser.user.email,
  password: mockPassword,
}

const invalidRegisterData: RegisterData = {
  email: 'test',
  username: 'test',
  password: 'wrong',
}

const validLoginData: LoginData = {
  identifier: mockUser.user.email,
  password: mockPassword,
}

const invalidLoginData: LoginData = {
  ...validLoginData,
  password: 'WrongPsw1*',
}

const rejectedRegisterResult: UserState = {
  ...initialState,
  user: { ...initialState.user },
  requestState: 'rejected',
  error: mockRegisterError,
}

const rejectedLoginResult: UserState = {
  ...rejectedRegisterResult,
  user: { ...rejectedRegisterResult.user },
  error: mockLoginError,
}

const fulfilledResult: UserState = {
  jwt: mockUser.jwt,
  user: {
    email: mockUser.user.email,
    username: mockUser.user.username,
  },
  requestState: 'fulfilled',
  error: undefined,
}

describe('User slice test cases:', () => {
  beforeEach(() => {
    removeTokenFromLocalStorage()
  })

  describe('Register flow:', () => {
    it('should fail with invalid data', async () => {
      await store.dispatch(register(invalidRegisterData))
      const { user: rejectedRegisterState } = store.getState()

      expect(rejectedRegisterState).toEqual(rejectedRegisterResult)
      expect(getTokenFromLocalStorage()).toBeNull()
    })

    it('should succeed with valid data', async () => {
      await store.dispatch(register(validRegisterData))
      const { user: fulfilledRegisterState } = store.getState()

      expect(fulfilledRegisterState).toEqual(fulfilledResult)
      expect(getTokenFromLocalStorage()).toBe(mockUser.jwt)
    })
  })

  describe('Login flow:', () => {
    it('should fail with invalid data', async () => {
      await store.dispatch(login(invalidLoginData))
      const { user: rejectedLoginState } = store.getState()

      expect(rejectedLoginState).toEqual(rejectedLoginResult)
      expect(getTokenFromLocalStorage()).toBeNull()
    })

    it('should succeed with valid data', async () => {
      await store.dispatch(login(validLoginData))
      const { user: fulfilledLoginState } = store.getState()

      expect(fulfilledLoginState).toEqual(fulfilledResult)
      expect(getTokenFromLocalStorage()).toBe(mockUser.jwt)
    })
  })

  describe('Get me flow:', () => {
    it('should succeed with saved token', async () => {
      setTokenToLocalStorage(mockUser.jwt)

      await store.dispatch(getMe())
      const { user: fulfilledGetMeState } = store.getState()

      expect(fulfilledGetMeState).toEqual(fulfilledResult)
    })
  })

  describe('Logout flow:', () => {
    it('should succeed after a successful login process', async () => {
      // Login
      await store.dispatch(login(validLoginData))
      const { user: fulfilledLoginState } = store.getState()

      expect(fulfilledLoginState).toEqual(fulfilledResult)
      expect(getTokenFromLocalStorage()).toBe(mockUser.jwt)

      // Logout
      await store.dispatch(logout())
      const { user: fulfilledLogoutState } = store.getState()

      expect(fulfilledLogoutState).toEqual(initialState)
      expect(getTokenFromLocalStorage()).toBeNull()
    })
  })
})
