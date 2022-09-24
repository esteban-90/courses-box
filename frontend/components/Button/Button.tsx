import { FC } from 'react'
import styled from '@emotion/styled'
import { makeShadow } from '@/styles/helpers'
import { ButtonProps, DefinedButton } from '@/types'

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
  transition: all 0.4s ease;

  color: ${({ color, theme }) => {
    const $font = color === 'secondary' ? 'regular' : color === 'warning' ? 'warning' : 'button'
    return theme.font[$font]
  }};

  background-color: ${({ color = 'primary', theme }) => {
    const $color = color === 'secondary' ? 'transparent' : theme.components[color]
    return $color
  }};

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

export const PrimaryButton: FC<DefinedButton> = (props): JSX.Element => <Button color='primary' {...props} />
export const SecondaryButton: FC<DefinedButton> = (props): JSX.Element => <Button color='secondary' {...props} />
export const DangerButton: FC<DefinedButton> = (props): JSX.Element => <Button color='danger' {...props} />
export const WarningButton: FC<DefinedButton> = (props): JSX.Element => <Button color='warning' {...props} />
