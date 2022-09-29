import { Provider } from 'react-redux'
import Register from '@/pages/register'
import { store } from '@/store'

export default {
  title: 'Pages/Register',
  component: Register,
}

export const RegisterPage = () => {
  return (
    <Provider store={store}>
      <Register />
    </Provider>
  )
}
