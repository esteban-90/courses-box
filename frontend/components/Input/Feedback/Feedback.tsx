import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'
import { FeedbackProps } from '@/types'

export const Feedback = styled.span<FeedbackProps>`
  color: ${({ isValid = false, theme }) => (isValid ? theme.font.valid : theme.font.invalid)};
`

export const ConditionalFeedback: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return children ? <Feedback>{children}</Feedback> : <>&nbsp;</>
}
