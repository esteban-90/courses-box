import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginData } from '@/types'
import { loginSchema } from '@/validations'

const loginValues: LoginData = {
  identifier: '',
  password: '',
}

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<LoginData>({
    defaultValues: loginValues,
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(loginValues, {
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
      identifier: register('identifier'),
      password: register('password'),
    },

    errors: {
      identifier: errors.identifier?.message,
      password: errors.password?.message,
    },
  }
}
