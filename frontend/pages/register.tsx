import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, ConditionalFeedback, Link, CenteredTile } from '@/components'
import { useRegisterForm } from '@/hooks'
import { registerFormData } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Register: NextPage = (): JSX.Element => {
  const {
    handleSubmit,
    emailField,
    passwordField,
    passwordConfirmationField,
    emailError,
    passwordError,
    passwordConfirmationError,
  } = useRegisterForm()

  const submitHandler = (data: registerFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} data-testid='registerForm'>
      <CenteredTile heading='Register Page'>
        <StyledInput
          label='Your email:'
          type='email'
          placeholder='user@example.com'
          {...emailField}
          feedback={<ConditionalFeedback>{emailError}</ConditionalFeedback>}
          data-testid='registerEmail'
        />

        <StyledInput
          label='Your password:'
          type='password'
          placeholder='********'
          maxLength={10}
          {...passwordField}
          feedback={<ConditionalFeedback>{passwordError}</ConditionalFeedback>}
          data-testid='registerPassword'
        />

        <StyledInput
          label='Confirm your password:'
          type='password'
          placeholder='********'
          maxLength={10}
          {...passwordConfirmationField}
          feedback={<ConditionalFeedback>{passwordConfirmationError}</ConditionalFeedback>}
          data-testid='registerPasswordConfirmation'
        />

        <Button type='submit' style={{ marginTop: '1rem' }}>
          Done
        </Button>

        <NextLink href='/login' passHref>
          <Link underline style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            Access your account
          </Link>
        </NextLink>
      </CenteredTile>
    </form>
  )
}

export default Register
