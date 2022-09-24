import styled from '@emotion/styled'
import { LinkProps } from '@/types'

export const Link = styled.a<LinkProps>`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.font.regular};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};

  &:hover {
    opacity: 0.7;
  }
`
