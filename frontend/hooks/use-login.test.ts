import { renderHook } from '@testing-library/react'
import { useLogin } from '@/hooks/use-login'

describe('useLogin test cases', () => {
  it('Generate field named identifier', () => {
    const { result } = renderHook(useLogin)
    expect(result.current.fields.identifier.name).toBe('identifier')
  })

  it('Generate field named password', () => {
    const { result } = renderHook(useLogin)
    expect(result.current.fields.password.name).toBe('password')
  })
})
