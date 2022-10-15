import { renderHook } from '@testing-library/react'
import { useId } from '@/hooks/use-id'

describe('useId test cases:', () => {
  it('should check id', () => {
    const { result } = renderHook(useId)
    expect(result.current).toMatch(/(\w|\d){13}/)
  })

  it('should generate unique id per render', () => {
    const { result: res1 } = renderHook(useId)
    const { result: res2 } = renderHook(useId)

    expect(res1.current).not.toBe(res2.current)
  })
})
