import styled from '@emotion/styled'

export const Link = styled.a`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.font.regular};

  &:hover {
    opacity: 0.7;
  }
`
