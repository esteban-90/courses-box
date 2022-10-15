import * as NextImage from 'next/image'
import { Provider } from 'react-redux'
import { ThemeProvider, Global } from '@emotion/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { handlers } from '../mocks/handlers'
import { store } from '../store'
import { GlobalStyles } from '../styles/global'
import { Themes } from '../styles/themes'

initialize()

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

const withStoreProvider = (Story, context) => {
  return (
    <Provider store={store}>
      <Story {...context} />
    </Provider>
  )
}

const withThemeProvider = (Story, context) => {
  const background = context.globals.backgrounds?.value ?? parameters.backgrounds.defaultColor
  const theme = Object.values(Themes).find((theme) => theme.background === background)

  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}

const withGlobalStyles = (Story, context) => {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Story {...context} />
    </>
  )
}

export const decorators = [withStoreProvider, withThemeProvider, withGlobalStyles, mswDecorator]

export const parameters = {
  backgrounds: {
    default: 'light',
    defaultColor: '#e4ebf5',
    values: [
      { name: 'dark', value: '#5e5c64' },
      { name: 'light', value: '#e4ebf5' },
    ],
  },

  actions: {
    argTypesRegex: '^on[A-Z].*',
  },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  msw: {
    handlers,
  },
}
