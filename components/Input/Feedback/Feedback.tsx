import styled from '@emotion/styled'

type FeedbackProps = {
  /** Is valid feedback */
  isValid?: boolean
}

export const Feedback = styled.span<FeedbackProps>`
  color: ${({ isValid = false, theme }) => (isValid ? theme.font.valid : theme.font.invalid)};
`
