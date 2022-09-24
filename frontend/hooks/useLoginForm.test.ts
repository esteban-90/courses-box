import { renderHook } from '@testing-library/react'
import { useLoginForm } from '@/hooks/useLoginForm'

describe('useLoginForm test cases', () => {
  it('Generate field named email', () => {
    const { result } = renderHook(useLoginForm)
    expect(result.current.emailField.name).toBe('email')
  })

  it('Generate field named password', () => {
    const { result } = renderHook(useLoginForm)
    expect(result.current.passwordField.name).toBe('password')
  })
})
