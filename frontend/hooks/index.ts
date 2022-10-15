import { useSelector, useDispatch } from 'react-redux'
import { name } from '@/services'
import type { AppDispatch, RootState } from '@/store'

const selectUser = ({ [name]: selection }: RootState) => selection

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = () => useSelector<RootState, RootState[typeof name]>(selectUser)

export * from './use-id'
export * from './use-login-form'
export * from './use-register-form'
