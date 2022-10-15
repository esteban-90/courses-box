import type { FC, ReactNode, CSSProperties } from 'react'
import styled from '@emotion/styled'

export const Feedback = styled.span<{ isValid?: boolean }>`
  color: ${({ isValid = false, theme }) => (isValid ? theme.font.valid : theme.font.invalid)};
`

export const OptionalFeedback: FC<{ children?: ReactNode }> = ({ children }): JSX.Element => {
  const style: CSSProperties = { marginBottom: '1rem' }

  return children ? <Feedback style={style}>{children}</Feedback> : <span style={style}>&nbsp;</span>
}
