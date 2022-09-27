import { object, ref, string } from 'yup'

/**
 * RegExp to match an username that is:
 * between five and eight alpha-numeric characters long
 * with zero or more numbers at the end,
 * optionally can start with a uppercase letter
 * and ends with only lowercase letters.
 */
const usernameRegExp = /^(?=.{5,8})(?![a-z]\d?$)[A-Z]?[a-z]+\d*$/

/**
 * RegExp to match a password that has at least:
 * one lowercase letter,
 * one uppercase letter,
 * one digit,
 * one special character
 * and is between eight and ten characters long.
 */
const passwordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,10})/

export const messages = {
  required: {
    field: 'This field is required',
  },

  invalid: {
    username: 'Username is not valid',
    email: 'Email is not valid',
    password: 'Password is not valid',
    passwordConfirmation: 'Passwords must match',
  },
}

const password = string().trim().required(messages.required.field).matches(passwordRegExp, messages.invalid.password)

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

  password,
})

export const registerSchema = object().shape({
  username: string().trim().required(messages.required.field).matches(usernameRegExp, messages.invalid.username),
  email: string().trim().required(messages.required.field).email(messages.invalid.email),
  password,
  passwordConfirmation: string().oneOf([ref('password'), null], messages.invalid.passwordConfirmation),
})
