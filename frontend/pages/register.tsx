/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Button, Input, OptionalFeedback, Link, CenteredTile } from '@/components'
import { useRegisterForm, useAppDispatch, useAppSelector } from '@/hooks'
import { register, logout } from '@/services'
import type { RegisterData } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Register: NextPage = (): JSX.Element | null => {
  const { jwt, error } = useAppSelector()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { handleSubmit, fields, errors } = useRegisterForm()

  const registerHandler = (data: RegisterData) => {
    dispatch(register(data))
  }

  useEffect(() => {
    if (jwt) router.push('/profile')
  }, [jwt])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(logout()), 5_000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return !jwt ? (
    <>
      <Head>
        <title>Register Page</title>
        <meta name='description' content='CoursesBox Register Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <form onSubmit={handleSubmit(registerHandler)} noValidate data-testid='form'>
        <CenteredTile heading='Register Page'>
          <OptionalFeedback>{error?.error.message}</OptionalFeedback>
          <StyledInput
            autoFocus
            label='Your username:'
            placeholder='...'
            minLength={5}
            maxLength={8}
            {...fields.username}
            feedback={<OptionalFeedback>{errors.username}</OptionalFeedback>}
            spellCheck={false}
            data-testid='username'
          />
          <StyledInput
            label='Your email:'
            type='email'
            placeholder='user@example.com'
            {...fields.email}
            feedback={<OptionalFeedback>{errors.email}</OptionalFeedback>}
            data-testid='email'
          />
          <StyledInput
            label='Your password:'
            type='password'
            placeholder='**********'
            minLength={8}
            maxLength={10}
            {...fields.password}
            feedback={<OptionalFeedback>{errors.password}</OptionalFeedback>}
            data-testid='password'
          />
          <StyledInput
            label='Confirm your password:'
            type='password'
            placeholder='**********'
            minLength={8}
            maxLength={10}
            {...fields.passwordConfirmation}
            feedback={<OptionalFeedback>{errors.passwordConfirmation}</OptionalFeedback>}
            data-testid='passwordConfirmation'
          />
          <Button type='submit' style={{ marginTop: '1rem' }}>
            Done
          </Button>
          <NextLink href='/login' passHref>
            <Link isUnderline style={{ marginTop: '1rem', fontWeight: 'bold' }}>
              Access your account
            </Link>
          </NextLink>
        </CenteredTile>
      </form>
    </>
  ) : null
}

export default Register
