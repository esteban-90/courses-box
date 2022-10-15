import NextLink from 'next/link'
import styled from '@emotion/styled'
import { Link, Logo } from '@/components'

const StyledWrapper = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  font-size: 3rem;
`

export default function Error404(): JSX.Element {
  return (
    <StyledWrapper>
      <Logo>404 - Page Not Found</Logo>
      <NextLink href='/' passHref>
        <StyledLink isUnderline>Go Home</StyledLink>
      </NextLink>
    </StyledWrapper>
  )
}
