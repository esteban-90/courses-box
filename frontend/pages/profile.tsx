import type { NextPage } from 'next'
import { Button, CenteredTile } from '@/components'

const Profile: NextPage = (): JSX.Element => {
  const userMock = {
    email: 'user@example.com',
  }

  const logoutHandler = async () => {
    console.log('logout')
  }

  return (
    <CenteredTile heading='Profile Page'>
      <span>Email: {userMock.email}</span>
      <Button onClick={logoutHandler} style={{ marginTop: '1rem' }}>
        Logout
      </Button>
    </CenteredTile>
  )
}

export default Profile
