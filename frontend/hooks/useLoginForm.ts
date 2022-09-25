import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginFormData } from '@/types'
import { loginSchema } from '@/validations'

const loginValues: loginFormData = {
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
    /** Props for email field */
    emailField: register('email'),
    /** Props for password field */
    passwordField: register('password'),
    /** Message for email field error */
    emailError: errors.email?.message,
    /** Message for password error */
    passwordError: errors.password?.message,
  }
}
