import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, ConditionalFeedback, Link, CenteredTile } from '@/components'
import { useLogin } from '@/hooks'
import { login, selectUser } from '@/services'
import { LoginData, RootState, AppDispatch } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Login: NextPage = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { jwt, error } = useSelector<RootState, RootState['user']>(selectUser)
  const { handleSubmit, fields, errors } = useLogin()

  const loginHandler = (data: LoginData) => {
    dispatch(login(data))
  }

  if (!!jwt && !error) {
    router.push('/profile')
  }

  return (
    <form onSubmit={handleSubmit(loginHandler)} noValidate data-testid='form'>
      <CenteredTile heading='Login Page'>
        <h3>
          <ConditionalFeedback>{error?.message}</ConditionalFeedback>
        </h3>

        <StyledInput
          label='Your username or email:'
          placeholder='...'
          {...fields.identifier}
          feedback={<ConditionalFeedback>{errors.identifier}</ConditionalFeedback>}
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
          feedback={<ConditionalFeedback>{errors.password}</ConditionalFeedback>}
          data-testid='password'
        />

        <Button type='submit' style={{ marginTop: '1rem' }}>
          Enter
        </Button>

        <NextLink href='/registration' passHref>
          <Link underline style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            Create your account
          </Link>
        </NextLink>
      </CenteredTile>
    </form>
  )
}

export default Login
