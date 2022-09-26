import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UserState, UserPayload, LoginData } from '@/types'

export const initialState: UserState = {
  username: '',
  email: '',
  jwt: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    update: (state, { payload }: PayloadAction<Partial<UserState>>) => ({ ...state, ...payload }),
    clear: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.jwt = payload.jwt
        state.username = payload.user.username
        state.email = payload.user.email
        state.requestState = 'fullfilled'
        state.error = undefined
      })
      .addCase(login.pending, (state) => {
        state.requestState = 'pending'
        state.error = undefined
      })
      .addCase(login.rejected, (state, { payload, error }) => {
        state.requestState = 'rejected'
        state.error = (payload as { error: typeof error })?.error
      })
  },
})

export const { actions, reducer } = userSlice

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

export const login = createAsyncThunk<UserPayload, Partial<LoginData>>(
  'user/login',

  async (loginData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem('jwt')

      const response = jwt
        ? await fetch(`${apiURL}/users/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
        : await fetch(`${apiURL}/auth/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          })

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
