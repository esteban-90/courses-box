import { useRef } from 'react'

export const useId = (): string => {
  const { current } = useRef(`prefix-${Math.random().toString(16).slice(2)}`)
  return current
}
