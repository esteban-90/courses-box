import styled from '@emotion/styled'
import { Link as _Link } from '@/components/Link'
import { makeShadow } from '@/styles/helpers'

export const Link = styled(_Link)`
  padding: 1vmin 2vmin;
  text-align: center;
`

export const Wrapper = styled.section`
  border-radius: 1rem;
  width: 94vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const boxShadow = makeShadow(shadow1, shadow2)
    return boxShadow
  }};

  @media (min-width: 900px) {
    width: 46vw;
  }
`
