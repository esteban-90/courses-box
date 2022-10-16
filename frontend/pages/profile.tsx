/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, CenteredTile } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getMe, logout } from '@/services'

const Profile: NextPage = (): JSX.Element | null => {
  const { jwt, user, error } = useAppSelector()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { email, username } = user

  const logoutHandler = () => {
    dispatch(logout())
    router.push('/')
  }

  useEffect(() => {
    if (error) {
      dispatch(logout())
      router.push('/login')
    }
  }, [error])

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return jwt ? (
    <>
      <Head>
        <title>Profile: {username}</title>
        <meta name='description' content='CoursesBox Profile Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <CenteredTile heading='Profile Page'>
        <span>Username: {username}</span>
        <span style={{ marginTop: '1rem' }}>Email: {email}</span>
        <Button onClick={logoutHandler} style={{ marginTop: '1rem' }}>
          Logout
        </Button>
      </CenteredTile>
    </>
  ) : null
}

export default Profile
