import { renderHook } from '@testing-library/react'
import { useLoginForm } from '@/hooks/use-login-form'

describe('useLoginForm test cases:', () => {
  it('should generate a field called identifier', () => {
    const { result } = renderHook(useLoginForm)
    expect(result.current.fields.identifier.name).toBe('identifier')
  })

  it('should generate a field called password', () => {
    const { result } = renderHook(useLoginForm)
    expect(result.current.fields.password.name).toBe('password')
  })
})
