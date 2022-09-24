import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, Feedback, Link, CenteredTile } from '@/components'
import { useLoginForm } from '@/hooks'
import { loginFormData } from '@/types'

const LoginInput = styled(Input)`
  margin-bottom: 1rem;
`

const Login: NextPage = (): JSX.Element => {
  const { handleSubmit, emailField, emailError, passwordField, passwordError } = useLoginForm()

  const submitHandler = (data: loginFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} data-testid='login-form'>
      <CenteredTile heading='Login Page'>
        <LoginInput
          label='Email'
          type='email'
          placeholder='username or email'
          {...emailField}
          feedback={emailError ? <Feedback>{emailError}</Feedback> : <>&nbsp;</>}
        />

        <LoginInput
          label='Password'
          type='password'
          placeholder='password'
          role='textbox'
          {...passwordField}
          feedback={passwordError ? <Feedback>{passwordError}</Feedback> : <>&nbsp;</>}
        />

        <Button type='submit'>Login</Button>

        <h3>
          <NextLink href='/registration' passHref>
            <Link underline>Create account</Link>
          </NextLink>
        </h3>
      </CenteredTile>
    </form>
  )
}

export default Login
