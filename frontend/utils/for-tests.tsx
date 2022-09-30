import { FC, ReactElement, ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { Layout } from '@/components'
import { rootReducer } from '@/store'
import { Themes } from '@/styles/themes'
import { StoreAndRenderOptions } from '@/types'

const customRender = (ui: ReactElement, { preloadedState, ...options }: StoreAndRenderOptions = {}): RenderResult => {
  const store = configureStore({ reducer: rootReducer, preloadedState })

  const Wrapper: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
      </StoreProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

const pageRender = (ui: ReactElement, { preloadedState, ...options }: StoreAndRenderOptions = {}): RenderResult => {
  const store = configureStore({ reducer: rootReducer, preloadedState })

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
