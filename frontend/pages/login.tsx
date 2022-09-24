import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { Button, Input, Feedback, Link, CenteredTile } from '@/components'

type LoginFormData = {
  identifier: string
  password: string
}

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`

const Login: NextPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const submitHandler = (data: LoginFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <CenteredTile heading='Login Page'>
        <StyledInput
          label='Identifier'
          placeholder='username or email'
          height={8}
          {...register('identifier', {
            required: 'This field is required',
            minLength: { value: 6, message: 'Too short, min length: 6' },
          })}
          feedback={errors.identifier ? <Feedback>{errors.identifier?.message}</Feedback> : <>&nbsp;</>}
        />

        <StyledInput
          label='Password'
          type='password'
          placeholder='password'
          height={8}
          role='textbox'
          {...register('password', {
            required: 'This field is required',
            minLength: { value: 8, message: 'Too short, min length: 8' },
          })}
          feedback={errors.password ? <Feedback>{errors.password?.message}</Feedback> : <>&nbsp;</>}
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
