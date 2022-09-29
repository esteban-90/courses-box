import { object, string } from 'yup'
import { messages, passwordRegExp, usernameRegExp } from '@/validations/common'

export const loginSchema = object().shape({
  identifier: string()
    .trim()
    .required(messages.required.field)
    .test('is-email', messages.invalid.email, (value) => {
      if (value) return value.includes('@') ? string().email().isValidSync(value) : true
      return true
    })
    .test('is-username', messages.invalid.username, (value) => {
      if (value) return !value.includes('@') ? string().matches(usernameRegExp).isValidSync(value) : true
      return true
    }),

  password: string().trim().required(messages.required.field).matches(passwordRegExp, messages.invalid.password),
})
