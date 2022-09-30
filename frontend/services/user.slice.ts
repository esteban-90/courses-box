import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { UserState, UserPayload, LoginData, RegisterData, RootState } from '@/types'

export const initialState: UserState = {
  username: '',
  email: '',
  jwt: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Logout flow
    builder.addCase(logout.fulfilled, () => initialState)

    // Login / Register flow
    builder
      .addMatcher<PayloadAction<UserPayload>>(
        (action) => /\/(login|register)\/fulfilled$/.test(action.type),
        (state, action) => {
          state.requestState = 'fulfilled'
          state.jwt = action.payload.jwt
          state.username = action.payload.user.username
          state.email = action.payload.user.email
          state.error = undefined
        }
      )
      .addMatcher(
        (action) => (action.type as string).endsWith('/pending'),
        (state) => void (state.requestState = 'pending')
      )
      .addMatcher(
        (action) => (action.type as string).endsWith('/rejected'),
        (state, action) => {
          state.error = (action.payload as { error: SerializedError })?.error
          state.requestState = 'rejected'
        }
      )
  },
})

export const { actions, reducer } = userSlice
export const selectUser = ({ user }: RootState) => user

const apiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL

const clearUserInfoFromLocalStorage = () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
}

const setUserInfoToLocalStorage = (result: UserPayload) => {
  localStorage.setItem('jwt', result.jwt)
  localStorage.setItem('username', result?.user?.username)
  localStorage.setItem('email', result?.user?.email)
}

const createRequest = (jwt: string | null, loginData: LoginData | undefined) => {
  if (jwt && !loginData) {
    return fetch(`${apiURL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  }

  if (loginData) {
    return fetch(`${apiURL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
  }

  throw { error: 'Invalid login request' }
}

export const login = createAsyncThunk<UserPayload, LoginData | undefined>(
  'user/login',

  async (loginData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem('jwt')
      const response = await createRequest(jwt, loginData)
      const data = await response.json()

      if (response.status < 200 || response.status >= 300) {
        clearUserInfoFromLocalStorage()
        return rejectWithValue(data)
      }

      const result = (jwt ? { jwt, user: data } : data) as UserPayload
      setUserInfoToLocalStorage(result)

      return result
    } catch (error) {
      clearUserInfoFromLocalStorage()
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('user/logout', async () => clearUserInfoFromLocalStorage())

export const register = createAsyncThunk<UserPayload, Omit<RegisterData, 'passwordConfirmation'>>(
  'user/register',

  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiURL}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(result)
      }

      setUserInfoToLocalStorage(result)

      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
