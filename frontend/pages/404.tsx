import Link from 'next/link'
import styled from '@emotion/styled'
import { Logo } from '@/components/Logo'
import { Link as _StyledLink } from '@/components/Link'

const StyledWrapper = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(_StyledLink)`
  text-decoration: underline;
  font-size: 3rem;
`

export default function Error404() {
  return (
    <StyledWrapper>
      <Logo>404 - Page Not Found</Logo>
      <Link href='/' passHref>
        <StyledLink>Go Home</StyledLink>
      </Link>
    </StyledWrapper>
  )
}
