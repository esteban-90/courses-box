import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Button, Input, ConditionalFeedback, Link, CenteredTile } from '@/components'
import { useRegister } from '@/hooks'
import { register, selectUser } from '@/services'
import { RegisterData, RootState, AppDispatch } from '@/types'

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Register: NextPage = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { jwt, error } = useSelector<RootState, RootState['user']>(selectUser)
  const { handleSubmit, fields, errors } = useRegister()

  const submitHandler = (data: RegisterData) => {
    dispatch(register(data))
  }

  if (!!jwt && !error) {
    router.push('/profile')
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate data-testid='form'>
      <CenteredTile heading='Register Page'>
        <h3>
          <ConditionalFeedback>{error?.message}</ConditionalFeedback>
        </h3>

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
