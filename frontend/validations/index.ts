import { object, ref, string } from 'yup'

/**
 * RegExp to match an username that is:
 * between five and eight alpha-numeric characters long
 * with zero or more numbers at the end
 * and has only lowercase letters.
 */
const usernameRegExp = /^(?=.{5,8})[a-z][a-z]+\d*$|^[a-z]\d\d+$/

/**
 * RegExp to match a password that has at least:
 * one lowercase letter,
 * one uppercase letter,
 * one digit,
 * one special character minus white spaces
 * and is between eight and ten characters long.
 */
const passwordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s])(?=.{8,10})/

const password = string().trim().required('Password is required')

export const loginSchema = object().shape({
  identifier: string().trim().required('Identifier is required'),
  password,
})

export const registerSchema = object().shape({
  username: string().trim().required('Username is required').matches(usernameRegExp, 'Username is not valid'),
  email: string().trim().required('Email is required').email('Email is not valid'),
  password: password.matches(passwordRegExp, 'Password is not strong enough'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
})
