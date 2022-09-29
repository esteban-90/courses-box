import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/services'

export const rootReducer = { user: userSlice.reducer }
export const store = configureStore({ reducer: rootReducer })
