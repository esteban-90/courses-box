import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Profile from '@/pages/profile'
import { mockUser } from '@/mocks/user'
import { rootReducer } from '@/store'

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      jwt: mockUser.jwt,
      username: mockUser.user.username,
      email: mockUser.user.email,
    },
  },
})

export default {
  title: 'Pages/Profile',
  component: Profile,
}

export const ProfilePage = () => {
  return (
    <Provider store={store}>
      <Profile />
    </Provider>
  )
}
