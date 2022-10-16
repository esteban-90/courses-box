import styled from '@emotion/styled'

export const Link = styled.a<{ isUnderline?: boolean }>`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.font.regular};
  text-decoration: ${({ isUnderline }) => (isUnderline ? 'underline' : 'none')};

  &:hover {
    opacity: 0.7;
  }
`
