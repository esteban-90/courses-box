import { FC, ReactElement, ReactNode } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { Themes } from '@/styles/themes'

const Wrapper: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
}

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult => {
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender as render }

// 14
