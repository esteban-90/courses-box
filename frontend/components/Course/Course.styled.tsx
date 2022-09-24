import styled from '@emotion/styled'
import { Link as _Link } from '@/components/Link'
import { makeShadow } from '@/styles/helpers'

export const Link = styled(_Link)`
  padding: 1vmin 4vmin;
`

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  width: 94vw;

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2)
    return $shadow
  }};

  @media (min-width: 900px) {
    width: 46vw;
  }
`
