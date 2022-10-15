import styled from '@emotion/styled'
import { Input as _Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { Logo as _Logo } from '@/components/Logo'

export const Content = styled.main`
  grid-area: content;
  min-height: 84vh;
  margin-top: 1rem;
`

export const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Input = styled(_Input)`
  grid-area: search;
  width: 100%;
  height: 3.5rem;
`

export const Logo = styled(_Logo)`
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3.5rem;

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

export const LogoLink = styled(Link)`
  padding-right: 1vw;
`

export const Navigation = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2vmin;
`

export const Wrapper = styled.div`
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
  }

  @media (min-width: 960px) {
    grid-template-columns: 1fr 4fr 2fr;

    grid-template-areas:
      'header search nav'
      'content content content'
      'footer footer footer';
  }
`
