import { Provider } from 'react-redux'
import Login from '@/pages/login'
import { store } from '@/store'

export default {
  title: 'Pages/Login',
  component: Login,
}

export const LoginPage = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  )
}
