import { FC, ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Icon, AvailableIcons } from '@/components/Icon'
import { makeShadow } from '@/styles/helpers'

const StyledInput = styled.input`
  all: unset;
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 0 1.4rem;

  width: 100%;
  height: 100%;
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

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

type StyledLabelProps = {
  /** Input height */
  height?: number

  /** Input width */
  width?: number
}

const StyledLabel = styled.label<StyledLabelProps>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 1rem;
  height: ${({ height }) => height}rem;
  width: ${({ width }) => width}rem;
  color: ${({ theme }) => theme.font.regular};
`

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 1.4rem;
  opacity: 0.7;
  color: ${({ theme }) => theme.font.placeholder};
`

const StyledText = styled.span`
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
} & StyledLabelProps &
  InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({
  label,
  icon,
  feedback,
  height = 7,
  width = 20,
  className,
  ...rest
}): JSX.Element => {
  return (
    <StyledLabel height={height} width={width} className={className}>
      {label && <StyledText>{label}</StyledText>}

      <StyledWrapper>
        <StyledInput {...rest} />
        {icon && <StyledIcon name={icon} />}
      </StyledWrapper>

      {feedback && <StyledText>{feedback}</StyledText>}
    </StyledLabel>
  )
}
