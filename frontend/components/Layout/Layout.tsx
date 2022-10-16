/* eslint-disable react-hooks/exhaustive-deps */
import type { FC, ReactNode, ChangeEventHandler } from 'react'
import { useState, useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@emotion/react'
import NextLink from 'next/link'
import { IconButton } from '@/components/IconButton'
import { Link } from '@/components/Link'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getMe } from '@/services'
import { Themes } from '@/styles/themes'
import * as Styled from '@styled/Layout'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const Layout: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const { jwt } = useAppSelector()
  const dispatch = useAppDispatch()

  const router = useRouter()
  const { q = '' } = router.query
  const [query, setQuery] = useState(q)

  const courseSearcher: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    setQuery(value)

    const trimmed = value.trim()
    if (!trimmed) router.push('/')
    if (trimmed.length >= 2) router.push({ pathname: '/search', query: { q: value } })
  }

  useEffect(() => {
    if (q) setQuery(q)
    if (query && !q) setQuery('')
  }, [q])

  const [isDark, setIsDark] = useState(true)
  const theme = Themes[isDark ? 'dark' : 'light']

  const themeToggler = () => {
    localStorage.setItem('courses-box-theme', isDark ? 'light' : 'dark')
    setIsDark(!isDark)
  }

  useIsomorphicLayoutEffect(() => {
    dispatch(getMe())

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
          {!jwt && (
            <NextLink href='/register' passHref>
              <IconButton name='UserAdd' size={1} />
            </NextLink>
          )}
          <NextLink href={jwt ? '/profile' : '/login'} passHref>
            <IconButton name={jwt ? 'User' : 'Login'} size={1} />
          </NextLink>
          <IconButton name={isDark ? 'Sun' : 'Moon'} size={1} onClick={themeToggler} />
        </Styled.Navigation>
        <Styled.Input icon='Search' placeholder='Search' value={query} onChange={courseSearcher} type='search' />
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
