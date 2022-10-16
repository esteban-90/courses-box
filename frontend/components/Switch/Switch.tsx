import type { FC, ChangeEventHandler } from 'react'
import { useId } from '@/hooks'
import * as Styled from '@styled/Switch'

type SwitchProps = {
  /** Change handler for switch */
  changeHandler: ChangeEventHandler<HTMLInputElement>
}

export const Switch: FC<SwitchProps> = ({ changeHandler }): JSX.Element => {
  const inputId = useId()

  return (
    <Styled.Wrapper>
      <input id={inputId} type='checkbox' onChange={changeHandler} />
      <Styled.VisiblePart htmlFor={inputId} data-testid='switchVisiblePart' />
    </Styled.Wrapper>
  )
}
