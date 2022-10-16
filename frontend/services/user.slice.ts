import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { apiUrl } from '@/config'
import type { UserState, UserPayload, User, ErrorPayload, LoginData, RegisterData } from '@/types'

const tokenName = 'courses-box-user'

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(tokenName)
}

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem(tokenName, token)
}

export const getTokenFromLocalStorage = () => {
  let jwt: string | null = ''

  if (typeof window === 'undefined') return jwt
  jwt = localStorage.getItem(tokenName)

  return jwt
}

export const name = 'user'

const options: RequestInit = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}

export const register = createAsyncThunk<UserPayload, RegisterData>(
  `${name}/register`,

  async (clientData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/local/register`, {
        ...options,
        body: JSON.stringify(clientData),
      })

      const serverData = await response.json()

      if (response.status >= 400) {
        const error = serverData as ErrorPayload
        throw error
      }

      const result = serverData as UserPayload
      setTokenToLocalStorage(result.jwt)

      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<UserPayload, LoginData>(
  `${name}/login`,

  async (clientData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/local`, {
        ...options,
        body: JSON.stringify(clientData),
      })

      const serverData = await response.json()

      if (response.status >= 400) {
        const error = serverData as ErrorPayload
        throw error
      }

      const result = serverData as UserPayload
      setTokenToLocalStorage(result.jwt)

      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getMe = createAsyncThunk<UserPayload, undefined>(
  `${name}/getMe`,

  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()

      const response = await fetch(`${apiUrl}/users/me`, {
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })

      const serverData = await response.json()

      if (response.status >= 400) {
        const error = serverData as ErrorPayload
        if (error?.error?.message === 'Forbidden') error.error.message = ''
        throw error
      }

      const user = serverData as User
      const result = { jwt: token, user } as UserPayload

      return result
    } catch (error) {
      removeTokenFromLocalStorage()
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(`${name}/logout`, () => removeTokenFromLocalStorage())

export const initialState: UserState = {
  jwt: '',
  user: {
    email: '',
    username: '',
  },
}

const userSlice = createSlice({
  name,
  initialState,
  reducers: {},

  extraReducers(builder) {
    // Logout flow
    builder.addCase(logout.fulfilled, () => initialState)

    // Login, Register and Get Me flow
    builder
      // FULFILLED
      .addMatcher<PayloadAction<UserPayload>>(
        (action) => /\/(login|register|getMe)\/fulfilled$/.test(action.type),
        (state, action) => {
          state.jwt = action.payload.jwt
          state.user.username = action.payload.user.username
          state.user.email = action.payload.user.email
          state.requestState = 'fulfilled'
        }
      )
      // PENDING
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => void (state.requestState = 'pending')
      )
      // REJECTED
      .addMatcher<PayloadAction<ErrorPayload>>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.requestState = 'rejected'
          state.error = action.payload
        }
      )
      // PENDING and REJECTED
      .addMatcher(
        (action) => !action.type.endsWith('/fulfilled'),
        (state) => {
          state.jwt = initialState.jwt
          state.user.username = initialState.user.username
          state.user.email = initialState.user.email
        }
      )
      // PENDING and FULFILLED
      .addMatcher(
        (action) => !action.type.endsWith('/rejected'),
        (state) => void (state.error = undefined)
      )
  },
})

export const { reducer } = userSlice
