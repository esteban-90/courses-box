import { FC, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useId } from '@/components/hooks'
import { makeShadow } from '@/styles/helpers'

const StyledWrapper = styled.label`
  & > input {
    display: none;
  }

  & > input:checked {
    & ~ label {
      background-color: ${({ theme }) => theme.components.primary};

      &::after {
        margin-left: 3.5rem;
        background-color: ${({ theme }) => theme.components.active};
      }
    }
  }
`

const StyledVisiblePart = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  height: 3rem;
  width: 6rem;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.components.background};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2)
    return $shadow
  }};

  &::after {
    content: '';
    margin-left: 0.5rem;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.components.nonActive};
    transition: all 0.4s ease;
  }
`

type SwitchProps = {
  /** Change handler */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Switch: FC<SwitchProps> = ({ onChange }): JSX.Element => {
  const inputId = useId()

  return (
    <StyledWrapper>
      <input id={inputId} type='checkbox' onChange={onChange} />
      <StyledVisiblePart htmlFor={inputId} data-testid='SwitchVisiblePart' />
    </StyledWrapper>
  )
}