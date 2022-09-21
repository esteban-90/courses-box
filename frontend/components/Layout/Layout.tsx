import { FC, ReactNode } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Logo } from '@/components/Logo'
import { Input } from '@/components/Input'
import { IconButton } from '@/components/IconButton'
import { Link as StyledLink } from '@/components/Link'

const StyledWrapper = styled.div`
  display: grid;
  gap: 0.1rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};

  grid-template-areas:
    'header nav'
    'search search'
    'content content'
    'footer footer';

  nav {
    flex-direction: row;
    justify-content: flex-end;
    gap: 5vmin;
  }

  @media (min-width: 500px) {
    grid-template-columns: 1fr 3fr;

    /* grid-template-areas:
      'header nav'
      'search search'
      'content content'
      'footer footer';

    nav {
      flex-direction: row;
      justify-content: space-between;
    } */
  }

  @media (min-width: 960px) {
    grid-template-columns: 1fr 4fr 2fr;

    grid-template-areas:
      'header search nav'
      'content content content'
      'footer footer footer';

    /* nav {
      flex-direction: row;
    } */
  }
`

const StyledLogoLink = styled(StyledLink)`
  padding-right: 1vw;
`

const StyledLogo = styled(Logo)`
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;

  & .logo_full {
    display: none;
  }

  @media (min-width: 560px) {
    & .logo_short {
      display: none;
    }

    & .logo_full {
      display: inline;
    }
  }
`

const StyledNavigation = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2vmin;

  /* a {
    cursor: pointer;
    color: ${({ theme }) => theme.font.regular};

    &:hover {
      opacity: 0.7;
    }
  } */
`

const StyledInput = styled(Input)`
  grid-area: search;
  width: 100%;
  height: 4rem;
`

const StyledContent = styled.main`
  grid-area: content;
`

const StyledFooter = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
`

type LayoutProps = {
  /** Layout children */
  children: ReactNode

  /** Theme toggler */
  onThemeToggle: () => void

  /** Theme color */
  isDark: boolean
}

export const Layout: FC<LayoutProps> = ({ children, isDark, onThemeToggle }): JSX.Element => {
  return (
    <StyledWrapper>
      <Link href='/' passHref>
        <StyledLogoLink>
          <StyledLogo size={3}>
            <span className='logo_short'>C8X</span>
            <span className='logo_full'>CoursesBox</span>
          </StyledLogo>
        </StyledLogoLink>
      </Link>

      <StyledNavigation>
        <Link href='/all' passHref>
          <StyledLink>All</StyledLink>
        </Link>
        <Link href='/news' passHref>
          <StyledLink>News</StyledLink>
        </Link>
        <IconButton name={isDark ? 'Sun' : 'Moon'} size={1} onClick={onThemeToggle} />
      </StyledNavigation>

      <StyledInput icon='Search' placeholder='Search' onChange={() => {}}></StyledInput>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>&copy; {new Date().getFullYear()} Esteban V.M. All rights reserved</StyledFooter>
    </StyledWrapper>
  )
}
