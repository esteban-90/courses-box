import { FC } from 'react'
import { useId } from '@/hooks'
import { CheckboxProps } from '@/types'
import * as Styled from './Checkbox.styled'

export const Checkbox: FC<CheckboxProps> = ({ onChange }): JSX.Element => {
  const inputId = useId()

  return (
    <Styled.Wrapper>
      <input id={inputId} type='checkbox' onChange={onChange} />
      <Styled.VisiblePart htmlFor={inputId}>&#x1F5F8;</Styled.VisiblePart>
    </Styled.Wrapper>
  )
}
