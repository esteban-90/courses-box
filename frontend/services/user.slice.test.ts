import { configureStore } from '@reduxjs/toolkit'
import { mockUser, LoginError, RegisterError } from '@/mocks/user'
import { reducer, initialState, login, logout, register } from '@/services/user.slice'
import { UserState, LoginData, RegisterData } from '@/types'

const storeCreator = () => configureStore({ reducer: { user: reducer } })

const userState: UserState = {
  jwt: mockUser.jwt,
  username: mockUser.user.username,
  email: mockUser.user.email,
}

const loginData: LoginData = {
  identifier: mockUser.user.email,
  password: mockUser.user.password,
}

const registerData: RegisterData = {
  username: mockUser.user.username,
  email: mockUser.user.email,
  password: mockUser.user.password,
}

describe('User slice test cases', () => {
  beforeEach(() => localStorage.clear())

  describe('Login flow', () => {
    it('success login flow', async () => {
      const store = storeCreator()

      const { user: userBeforeLogin } = store.getState()
      const resultBeforeLogin: UserState = { ...initialState }
      expect(userBeforeLogin).toEqual(resultBeforeLogin)

      await store.dispatch(login(loginData))

      const { user: userAfterLogin } = store.getState()
      const resultAfterLogin: UserState = { ...userState, requestState: 'fulfilled' }
      expect(userAfterLogin).toEqual(resultAfterLogin)

      expect(localStorage.getItem('jwt')).toBe(mockUser.jwt)
      expect(localStorage.getItem('username')).toBe(mockUser.user.username)
      expect(localStorage.getItem('email')).toBe(mockUser.user.email)
    })

    it('fail login flow', async () => {
      const store = storeCreator()
      const invalidLoginData: LoginData = { ...loginData, password: 'wrongpass' }
      await store.dispatch(login(invalidLoginData))

      const { user } = store.getState()
      const invalidResult: UserState = { ...initialState, requestState: 'rejected', ...LoginError }
      expect(user).toEqual(invalidResult)
    })

    it('with saved jwt', async () => {
      localStorage.setItem('jwt', mockUser.jwt)

      const store = storeCreator()
      await store.dispatch(login())

      const { user } = store.getState()
      const validResult: UserState = { ...userState, requestState: 'fulfilled' }
      expect(user).toEqual(validResult)
    })
  })

  describe('Logout flow', () => {
    it('logout action', async () => {
      const store = storeCreator()

      // Login
      await store.dispatch(login(loginData))

      const { user: userAfterLogin } = store.getState()
      const resultAfterLogin: UserState = { ...userState, requestState: 'fulfilled' }
      expect(userAfterLogin).toEqual(resultAfterLogin)

      expect(localStorage.getItem('jwt')).toBe(mockUser.jwt)
      expect(localStorage.getItem('username')).toBe(mockUser.user.username)
      expect(localStorage.getItem('email')).toBe(mockUser.user.email)

      // Logout
      await store.dispatch(logout())

      const { user: userAfterLogout } = store.getState()
      const resultAfterLogout: UserState = { ...initialState }
      expect(userAfterLogout).toEqual(resultAfterLogout)

      expect(localStorage.getItem('jwt')).toBeNull()
      expect(localStorage.getItem('username')).toBeNull()
      expect(localStorage.getItem('email')).toBeNull()
    })
  })

  describe('Register flow', () => {
    it('fail register flow', async () => {
      const store = storeCreator()
      const invalidRegisterData: RegisterData = { email: 'test', username: 'test', password: 'wrong' }
      await store.dispatch(register(invalidRegisterData))

      const { user } = store.getState()
      const invalidResult: UserState = { ...initialState, requestState: 'rejected', ...RegisterError }
      expect(user).toEqual(invalidResult)

      expect(localStorage.getItem('jwt')).toBeNull()
      expect(localStorage.getItem('username')).toBeNull()
      expect(localStorage.getItem('email')).toBeNull()
    })

    it('success register flow', async () => {
      const store = storeCreator()
      await store.dispatch(register(registerData))

      const { user } = store.getState()
      const validResult: UserState = { ...userState, requestState: 'fulfilled' }
      expect(user).toEqual(validResult)

      expect(localStorage.getItem('jwt')).toBe(mockUser.jwt)
      expect(localStorage.getItem('username')).toBe(mockUser.user.username)
      expect(localStorage.getItem('email')).toBe(mockUser.user.email)
    })
  })
})
