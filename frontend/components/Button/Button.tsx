import type { FC } from 'react'
import styled from '@emotion/styled'
import { makeShadow } from '@/styles/helpers'

type ButtonProps = {
  /** Button action */
  action?: 'primary' | 'secondary' | 'danger' | 'warning'
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
  transition: all 0.4s ease;

  color: ${({ action, theme }) => {
    const color = action === 'secondary' ? 'regular' : action === 'warning' ? 'warning' : 'button'
    return theme.font[color]
  }};

  background-color: ${({ action = 'primary', theme }) => {
    const backgroundColor = action === 'secondary' ? 'transparent' : theme.components[action]
    return backgroundColor
  }};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const boxShadow = makeShadow(shadow1, shadow2)
    return boxShadow
  }};

  &:active {
    box-shadow: ${({ theme }) => {
      const { shadow1, shadow2 } = theme.components
      const boxShadow = makeShadow(shadow1, shadow2, true)
      return boxShadow
    }};
  }

  &:hover {
    opacity: 0.9;
  }
`

type ActionButtonProps = Omit<ButtonProps, 'action'>

export const PrimaryButton: FC<ActionButtonProps> = (props): JSX.Element => <Button action='primary' {...props} />
export const SecondaryButton: FC<ActionButtonProps> = (props): JSX.Element => <Button action='secondary' {...props} />
export const DangerButton: FC<ActionButtonProps> = (props): JSX.Element => <Button action='danger' {...props} />
export const WarningButton: FC<ActionButtonProps> = (props): JSX.Element => <Button action='warning' {...props} />
