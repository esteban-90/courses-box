import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, ConditionalFeedback, Link, CenteredTile } from '@/components'
import { useLoginForm } from '@/hooks'
import { LoginData } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Login: NextPage = (): JSX.Element => {
  const { handleSubmit, fields, errors } = useLoginForm()

  const submitHandler = (data: LoginData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate data-testid='loginForm'>
      <CenteredTile heading='Login Page'>
        <StyledInput
          label='Your username or email:'
          placeholder='...'
          {...fields.identifier}
          feedback={<ConditionalFeedback>{errors.identifier}</ConditionalFeedback>}
          data-testid='loginIdentifier'
        />

        <StyledInput
          label='Your password:'
          type='password'
          placeholder='**********'
          minLength={8}
          maxLength={10}
          {...fields.password}
          feedback={<ConditionalFeedback>{errors.password}</ConditionalFeedback>}
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
