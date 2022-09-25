import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, ConditionalFeedback, Link, CenteredTile } from '@/components'
import { useLoginForm } from '@/hooks'
import { loginFormData } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Login: NextPage = (): JSX.Element => {
  const { handleSubmit, emailField, emailError, passwordField, passwordError } = useLoginForm()

  const submitHandler = (data: loginFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate data-testid='loginForm'>
      <CenteredTile heading='Login Page'>
        <StyledInput
          label='Your email:'
          type='email'
          placeholder='user@example.com'
          {...emailField}
          feedback={<ConditionalFeedback>{emailError}</ConditionalFeedback>}
          data-testid='loginEmail'
        />

        <StyledInput
          label='Your password:'
          type='password'
          placeholder='********'
          minLength={8}
          maxLength={10}
          {...passwordField}
          feedback={<ConditionalFeedback>{passwordError}</ConditionalFeedback>}
          data-testid='loginPassword'
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
