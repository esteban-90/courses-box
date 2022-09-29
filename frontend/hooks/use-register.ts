import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterData } from '@/types'
import { registerSchema } from '@/validations'

const registerValues: RegisterData = {
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
}

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<RegisterData>({
    defaultValues: registerValues,
    resolver: yupResolver(registerSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(registerValues, {
        keepDefaultValues: true,
        keepDirty: false,
        keepTouched: false,
        keepErrors: false,
      })
    }
  }, [isSubmitSuccessful, reset])

  return {
    handleSubmit,

    fields: {
      username: register('username'),
      email: register('email'),
      password: register('password'),
      passwordConfirmation: register('passwordConfirmation'),
    },

    errors: {
      username: errors.username?.message,
      email: errors.email?.message,
      password: errors.password?.message,
      passwordConfirmation: errors.passwordConfirmation?.message,
    },
  }
}
