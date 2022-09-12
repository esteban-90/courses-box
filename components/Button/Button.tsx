import { MouseEvent } from 'react'
import styled from '@emotion/styled'
import { boxShadow, transition, getColors, Color } from '@/components/styles'

export type ButtonProps = {
  children: string
  color?: Color
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 1.6rem;
  width: 15rem;
  height: 4rem;
  border-radius: 1rem;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    ${({ theme }) => boxShadow(theme.components.shadow1, theme.components.shadow2, true)}
  }

  ${transition()}
  ${({ color, theme }) => getColors(theme, color)}
  ${({ theme }) => boxShadow(theme.components.shadow1, theme.components.shadow2)}
`

Button.defaultProps = { color: 'primary' }
