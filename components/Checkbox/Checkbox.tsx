import { FC, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useId } from '@/components/hooks'
import { makeShadow } from '@/styles/helpers'

const StyledWrapper = styled.label`
  font-size: 1.8rem;

  & > input {
    display: none;
  }

  & > input:checked {
    & ~ label {
      color: ${({ theme }) => theme.font.regular};

      box-shadow: ${({ theme }) => {
        const { shadow1, shadow2 } = theme.components
        const $shadow = makeShadow(shadow1, shadow2, true)
        return $shadow
      }};
    }
  }
`

const StyledVisiblePart = styled.label`
  display: inline-block;
  user-select: none;
  cursor: pointer;
  text-align: center;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  color: rgba(0, 0, 0, 0);
  transition: all 0.4s ease;
  background-color: ${({ theme }) => theme.components.background};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2)
    return $shadow
  }};

  &:hover {
    box-shadow: ${({ theme }) => {
      const { shadow1, shadow2 } = theme.components
      const $shadow = makeShadow(shadow1, shadow2, true)
      return $shadow
    }};
  }
`

type CheckboxProps = {
  /** Change handler */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({ onChange }): JSX.Element => {
  const inputId = useId()

  return (
    <StyledWrapper>
      <input id={inputId} type='checkbox' onChange={onChange} />
      <StyledVisiblePart htmlFor={inputId}>&#x1F5F8;</StyledVisiblePart>
    </StyledWrapper>
  )
}
