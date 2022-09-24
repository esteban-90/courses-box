import { FC, forwardRef, ForwardedRef } from 'react'
import { InputProps } from '@/types'
import * as Styled from './Input.styled'

export const Input: FC<InputProps> = forwardRef(
  ({ label, icon, feedback, height = 7, width = 20, className, ...rest }, ref): JSX.Element => {
    return (
      <Styled.OuterWrapper
        height={height}
        width={width}
        isLabelVisible={!!label}
        isFeedbackVisible={!!feedback}
        className={className}
      >
        <Styled.Label>{label}</Styled.Label>

        <Styled.InnerWrapper>
          <Styled.Input ref={ref as ForwardedRef<HTMLInputElement>} {...rest} />
          {icon && <Styled.Icon name={icon} />}
        </Styled.InnerWrapper>

        <Styled.Feedback role='alert'>{feedback}</Styled.Feedback>
      </Styled.OuterWrapper>
    )
  }
)

Input.displayName = 'Input'
