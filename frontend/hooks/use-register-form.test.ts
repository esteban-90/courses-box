import { renderHook } from '@testing-library/react'
import { useRegisterForm } from '@/hooks/use-register-form'

describe('useRegisterForm test cases:', () => {
  it('should generate a called username', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.username.name).toBe('username')
  })

  it('should generate a called email', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.email.name).toBe('email')
  })

  it('should generate a called password', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.password.name).toBe('password')
  })

  it('should generate a called passwordConfirmation', () => {
    const { result } = renderHook(useRegisterForm)
    expect(result.current.fields.passwordConfirmation.name).toBe('passwordConfirmation')
  })
})
