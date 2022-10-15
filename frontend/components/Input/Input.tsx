import type { FC, ChangeEventHandler, InputHTMLAttributes, ReactNode, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import type { IconNames } from '@/components/Icon'
import * as Styled from '@styled/Input'

type InputProps = {
  /** Input placeholder */
  placeholder: string
  /** Change handler */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Input label */
  label?: string
  /** Icon */
  icon?: IconNames
  /** Feedback for input */
  feedback?: ReactNode
} & Styled.WrapperProps &
  InputHTMLAttributes<HTMLInputElement>

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
