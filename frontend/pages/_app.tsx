import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Layout } from '@/components'
import { store } from '@/store'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
