import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { Themes } from '@/styles/themes'
import { Layout } from '@/components/Layout'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [isDark, setIsDark] = useState(false)
  const theme = Themes[isDark ? 'dark' : 'light']
  const toggleTheme = () => setIsDark(!isDark)

  useEffect(() => {
    setIsDark(matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Layout onThemeToggle={toggleTheme} isDark={isDark}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
