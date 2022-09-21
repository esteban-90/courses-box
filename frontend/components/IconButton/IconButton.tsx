import { FC, MouseEvent } from 'react'
import styled from '@emotion/styled'
import { Icon, IconProps } from '@/components/Icon'
import { makeShadow } from '@/styles/helpers'

type StyledButtonProps = {
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
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

type IconButtonProps = {
  /** Click handler */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
} & IconProps

export const IconButton: FC<IconButtonProps> = ({ onClick, ...rest }): JSX.Element => {
  return (
    <StyledButton onClick={onClick} size={(rest.size ?? 2) * 2} title={rest.name}>
      <Icon {...rest} />
    </StyledButton>
  )
}
