import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginFormData } from '@/types'
import { loginSchema } from '@/validations'

const loginValues = {
  email: '',
  password: '',
}

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<loginFormData>({
    defaultValues: loginValues,
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(loginValues, {
        keepDefaultValues: true,
        keepDirty: false,
        keepTouched: false,
      })
    }
  }, [isSubmitSuccessful, reset])

  return {
    /** Submit handler */
    handleSubmit,
    /** Email field props */
    emailField: register('email'),
    /** Password field props */
    passwordField: register('password'),
    /** Email error message */
    emailError: errors.email?.message,
    /** Password error message */
    passwordError: errors.password?.message,
  }
}
