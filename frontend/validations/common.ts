import { string } from 'yup'

/**
 * RegExp to match an username that is:
 * between five and eight alpha-numeric characters long
 * with zero or more numbers at the end,
 * optionally can start with a uppercase letter
 * and ends with only lowercase letters.
 */
export const usernameRegExp = /^(?=.{5,8})(?![a-z]\d?$)[A-Z]?[a-z]+\d*$/

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

export const password = string()
  .trim()
  .required(messages.required.field)
  .matches(passwordRegExp, messages.invalid.password)
