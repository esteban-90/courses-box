import type { FC, ReactElement, ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { render, type RenderResult, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { Layout } from '@/components'
import { store } from '@/store'
import { Themes } from '@/styles/themes'

const customRender = (ui: ReactElement, options: RenderOptions = {}): RenderResult => {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
      </StoreProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

const pageRender = (ui: ReactElement, options: RenderOptions = {}): RenderResult => {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    return (
      <StoreProvider store={store}>
        <Layout>{children}</Layout>
      </StoreProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender as render, pageRender }
