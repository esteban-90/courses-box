import type { FC, ChangeEventHandler } from 'react'
import { useId } from '@/hooks'
import * as Styled from '@styled/Checkbox'

type CheckboxProps = {
  /** Change handler for checkbox */
  changeHandler: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox: FC<CheckboxProps> = ({ changeHandler }): JSX.Element => {
  const inputId = useId()

  return (
    <Styled.Wrapper>
      <input id={inputId} type='checkbox' onChange={changeHandler} />
      <Styled.VisiblePart htmlFor={inputId}>&#x1F5F8;</Styled.VisiblePart>
    </Styled.Wrapper>
  )
}
