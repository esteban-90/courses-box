import { object, ref, string } from 'yup'
import { messages, password, usernameRegExp } from '@/validations/common'

export const registerSchema = object().shape({
  username: string().trim().required(messages.required.field).matches(usernameRegExp, messages.invalid.username),
  email: string().trim().required(messages.required.field).email(messages.invalid.email),
  password,
  passwordConfirmation: string().oneOf([ref('password'), null], messages.invalid.passwordConfirmation),
})
