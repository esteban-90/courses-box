import { FC } from 'react'
import { useId } from '@/hooks'
import { SwitchProps } from '@/types'
import * as Styled from './Switch.styled'

export const Switch: FC<SwitchProps> = ({ onChange }): JSX.Element => {
  const inputId = useId()

  return (
    <Styled.Wrapper>
      <input id={inputId} type='checkbox' onChange={onChange} />
      <Styled.VisiblePart htmlFor={inputId} data-testid='SwitchVisiblePart' />
    </Styled.Wrapper>
  )
}
