import { renderHook } from '@testing-library/react'
import { useRegister } from '@/hooks/use-register'

describe('useRegister test cases', () => {
  it('Generate field named username', () => {
    const { result } = renderHook(useRegister)
    expect(result.current.fields.username.name).toBe('username')
  })

  it('Generate field named email', () => {
    const { result } = renderHook(useRegister)
    expect(result.current.fields.email.name).toBe('email')
  })

  it('Generate field named password', () => {
    const { result } = renderHook(useRegister)
    expect(result.current.fields.password.name).toBe('password')
  })

  it('Generate field named passwordConfirmation', () => {
    const { result } = renderHook(useRegister)
    expect(result.current.fields.passwordConfirmation.name).toBe('passwordConfirmation')
  })
})
