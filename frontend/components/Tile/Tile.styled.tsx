import styled from '@emotion/styled'
import { makeShadow } from '@/styles/helpers'

export const Wrapper = styled.section`
  padding: 1vmin 4vmin 4vmin;
  border-radius: 1rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const boxShadow = makeShadow(shadow1, shadow2)
    return boxShadow
  }};
`
