import { renderHook } from '@testing-library/react'
import { useLoginForm } from '@/hooks/useLoginForm'

describe('useLoginForm test cases', () => {
  it('Generate field named identifier', () => {
    const { result } = renderHook(useLoginForm)
    expect(result.current.fields.identifier.name).toBe('identifier')
  })

  it('Generate field named password', () => {
    const { result } = renderHook(useLoginForm)
    expect(result.current.fields.password.name).toBe('password')
  })
})
