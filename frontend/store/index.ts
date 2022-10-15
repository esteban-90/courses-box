import { configureStore } from '@reduxjs/toolkit'
import { name, reducer } from '@/services'

const rootReducer = { [name]: reducer }
export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
