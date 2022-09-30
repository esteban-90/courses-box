import { FC, useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import NextLink from 'next/link'
import { IconButton } from '@/components/IconButton'
import { Link } from '@/components/Link'
import { login, selectUser } from '@/services'
import { Themes } from '@/styles/themes'
import { LayoutProps, AppDispatch, RootState } from '@/types'
import * as Styled from './Layout.styled'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  const [isDark, setIsDark] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const { username } = useSelector<RootState, RootState['user']>(selectUser)
  const theme = Themes[isDark ? 'dark' : 'light']

  const toggleTheme = () => {
    localStorage.setItem('courses-box-theme', isDark ? 'light' : 'dark')
    setIsDark(!isDark)
  }

  useIsomorphicLayoutEffect(() => {
    dispatch(login())

    const savedTheme = localStorage.getItem('courses-box-theme')
    const savedThemeExists = savedTheme !== null
    const savedThemeIsDark = savedTheme === 'dark'
    const preferenceIsDark = window.matchMedia('prefers-color-scheme: dark').matches
    const themeIsDark = savedThemeExists ? savedThemeIsDark : preferenceIsDark

    setIsDark(themeIsDark)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Styled.Wrapper>
        <NextLink href='/' passHref>
          <Styled.LogoLink>
            <Styled.Logo size={3}>
              <span className='logo_short'>C8X</span>
              <span className='logo_full'>CoursesBox</span>
            </Styled.Logo>
          </Styled.LogoLink>
        </NextLink>

        <Styled.Navigation>
          <NextLink href='/all' passHref>
            <Link>All</Link>
          </NextLink>

          <NextLink href={username ? '/profile' : '/login'} passHref>
            <IconButton name={username ? 'User' : 'Login'} size={1} />
          </NextLink>

          <IconButton name={isDark ? 'Sun' : 'Moon'} size={1} onClick={toggleTheme} />
        </Styled.Navigation>

        <Styled.Input icon='Search' placeholder='Search' onChange={() => {}} />
        <Styled.Content>{children}</Styled.Content>

        <Styled.Footer>
          <p>
            &copy; {new Date().getFullYear()}&nbsp;
            <Link href='https://github.com/esteban-90' target='_blank'>
              Esteban V.M.
            </Link>
            &nbsp;
          </p>
          <p>All rights reserved</p>
        </Styled.Footer>
      </Styled.Wrapper>
    </ThemeProvider>
  )
}
