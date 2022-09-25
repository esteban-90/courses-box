import { object, ref, string } from 'yup'

const loginData = {
  email: string().trim().required('Email is required').email('Email is not valid'),
  password: string()
    .trim()
    .required('Password is required')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,10})/, 'Password is not strong enough'),
}

const registerData = {
  ...loginData,
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
}

export const loginSchema = object().shape(loginData)
export const registerSchema = object().shape(registerData)
