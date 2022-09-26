import { renderHook } from '@testing-library/react'
import { useRegisterForm } from '@/hooks/useRegisterForm'

describe('useRegisterForm test cases', () => {
  it('Generate field named username', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.username.name).toBe('username')
  })

  it('Generate field named email', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.email.name).toBe('email')
  })

  it('Generate field named password', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.password.name).toBe('password')
  })

  it('Generate field named passwordConfirmation', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.passwordConfirmation.name).toBe('passwordConfirmation')
  })
})
