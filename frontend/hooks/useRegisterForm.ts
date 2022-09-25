import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerFormData } from '@/types'
import { registerSchema } from '@/validations'

const registerValues: registerFormData = {
  email: '',
  password: '',
  passwordConfirmation: '',
}

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<registerFormData>({
    defaultValues: registerValues,
    resolver: yupResolver(registerSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(registerValues, {
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
    /** Props for password confirmation field */
    passwordConfirmationField: register('passwordConfirmation'),
    /** Message for email field error */
    emailError: errors.email?.message,
    /** Message for password error */
    passwordError: errors.password?.message,
    /** Message for password confirmation error */
    passwordConfirmationError: errors.passwordConfirmation?.message,
  }
}
