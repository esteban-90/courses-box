import { FC, ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Icon, AvailableIcons } from '@/components/Icon'
import { makeShadow } from '@/styles/helpers'

const $Input = styled.input`
  all: unset;
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 0 1.4rem;

  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  color: ${({ theme }) => theme.font.regular};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2, true)
    return $shadow
  }};

  &:focus {
    box-shadow: ${({ theme }) => {
      const { shadow1, shadow2 } = theme.components
      const $shadow = makeShadow(shadow1, shadow2)
      return $shadow
    }};
  }

  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.font.placeholder};
  }

  &:not(:placeholder-shown) {
    & ~ svg {
      display: none;
    }
  }

  &:hover {
    cursor: text;
  }
`

const $Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const $Label = styled.label`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 1rem;
  color: ${({ theme }) => theme.font.regular};
`

const $Icon = styled(Icon)`
  margin-left: -2.5rem;
  opacity: 0.7;
  color: ${({ theme }) => theme.font.placeholder};
`

const $Text = styled.span`
  padding-left: 1.4rem;
`

type InputProps = {
  /** Input placeholder */
  placeholder: string

  /** Change handler */
  onChange: ChangeEventHandler<HTMLInputElement>

  /** Input label */
  label?: string

  /** Icon */
  icon?: AvailableIcons

  /** Feedback for input */
  feedback?: ReactNode

  /** Input height */
  height?: number

  /** Input width */
  width?: number
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({ label, icon, feedback, height = 4, width = 20, ...rest }): JSX.Element => {
  return (
    <$Label>
      {label && <$Text>{label}</$Text>}

      <$Wrapper>
        <$Input height={height} width={width} {...rest} />
        {icon && <$Icon name={icon} />}
      </$Wrapper>

      {feedback && <$Text>{feedback}</$Text>}
    </$Label>
  )
}
