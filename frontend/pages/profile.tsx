import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CenteredTile } from '@/components'
import { logout, selectUser } from '@/services'
import { RootState, AppDispatch } from '@/types'

const Profile: NextPage = (): JSX.Element | null => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { username, email, error } = useSelector<RootState, RootState['user']>(selectUser)

  const logoutHandler = () => {
    dispatch(logout())
    router.push('/')
  }

  useEffect(() => {
    if (!username || !!error) {
      dispatch(logout())
      router.push('/login')
    }
  }, [dispatch, error, router, username])

  return username && email ? (
    <CenteredTile heading='Profile Page'>
      <span>Username: {username}</span>
      <span style={{ marginTop: '1rem' }}>Email: {email}</span>
      <Button onClick={logoutHandler} style={{ marginTop: '1rem' }}>
        Logout
      </Button>
    </CenteredTile>
  ) : null
}

export default Profile
