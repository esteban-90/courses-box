import { object, string } from 'yup'

export const loginSchema = object().shape({
  email: string().trim().required('Email is required').email('Email is not valid'),
  password: string()
    .trim()
    .required('Password is required')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,10})/, 'Password is not strong enough'),
})

export const registerSchema = {
  ...loginSchema,
}
