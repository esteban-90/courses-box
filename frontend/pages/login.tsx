/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Button, Input, OptionalFeedback, Link, CenteredTile } from '@/components'
import { useLoginForm, useAppDispatch, useAppSelector } from '@/hooks'
import { login, logout } from '@/services'
import type { LoginData } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Login: NextPage = (): JSX.Element | null => {
  const { jwt, error } = useAppSelector()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { handleSubmit, fields, errors } = useLoginForm()

  const loginHandler = (data: LoginData) => {
    dispatch(login(data))
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
        <title>Login Page</title>
        <meta name='description' content='CoursesBox Login Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <form onSubmit={handleSubmit(loginHandler)} noValidate data-testid='form'>
        <CenteredTile heading='Login Page'>
          <OptionalFeedback>{error?.error?.message ?? ''}</OptionalFeedback>
          <StyledInput
            autoFocus
            label='Your username or email:'
            placeholder='...'
            {...fields.identifier}
            feedback={<OptionalFeedback>{errors.identifier}</OptionalFeedback>}
            spellCheck={false}
            data-testid='identifier'
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
          <Button type='submit' style={{ marginTop: '1rem' }}>
            Enter
          </Button>
          <NextLink href='/register' passHref>
            <Link isUnderline style={{ marginTop: '1rem', fontWeight: 'bold' }}>
              Create your account
            </Link>
          </NextLink>
        </CenteredTile>
      </form>
    </>
  ) : null
}

export default Login
