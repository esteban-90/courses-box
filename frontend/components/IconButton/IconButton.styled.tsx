import styled from '@emotion/styled'
import { makeShadow } from '@/styles/helpers'

type ButtonProps = {
  size: number
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.4s ease;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2)
    return $shadow
  }};

  &:active {
    box-shadow: ${({ theme }) => {
      const { shadow1, shadow2 } = theme.components
      const $shadow = makeShadow(shadow1, shadow2, true)
      return $shadow
    }};
  }

  &:hover {
    opacity: 0.9;
  }
`
