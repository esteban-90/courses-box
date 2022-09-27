import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, ConditionalFeedback, Link, CenteredTile } from '@/components'
import { useRegisterForm } from '@/hooks'
import { RegisterData } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Register: NextPage = (): JSX.Element => {
  const { handleSubmit, fields, errors } = useRegisterForm()

  const submitHandler = (data: RegisterData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate data-testid='form'>
      <CenteredTile heading='Register Page'>
        <StyledInput
          label='Your username:'
          placeholder='...'
          minLength={5}
          maxLength={8}
          {...fields.username}
          feedback={<ConditionalFeedback>{errors.username}</ConditionalFeedback>}
          spellCheck={false}
          data-testid='username'
        />

        <StyledInput
          label='Your email:'
          type='email'
          placeholder='user@example.com'
          {...fields.email}
          feedback={<ConditionalFeedback>{errors.email}</ConditionalFeedback>}
          data-testid='email'
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

        <StyledInput
          label='Confirm your password:'
          type='password'
          placeholder='**********'
          minLength={8}
          maxLength={10}
          {...fields.passwordConfirmation}
          feedback={<ConditionalFeedback>{errors.passwordConfirmation}</ConditionalFeedback>}
          data-testid='passwordConfirmation'
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
