import { useRouter } from 'next/router'
import { mockUser } from '@/mocks/users'
import Profile from '@/pages/profile'
import { setTokenToLocalStorage, removeTokenFromLocalStorage } from '@/services'
import { pageRender as render, screen, waitFor } from '@/tests/utils'

describe('Profile Page test cases:', () => {
  it('should check render', () => {
    const { container } = render(<Profile />)
    expect(container).toMatchSnapshot()
  })

  it('should load user', async () => {
    setTokenToLocalStorage(mockUser.jwt)

    const push = jest.fn()
    void (useRouter as jest.Mock).mockReturnValue({ query: {}, push })

    const { container } = render(<Profile />)
    await screen.findByText('Profile Page')

    const username = screen.getByText(`Username: ${mockUser.user.username}`)
    const email = screen.getByText(`Email: ${mockUser.user.email}`)

    expect(container).toMatchSnapshot()
    expect(username).toBeInTheDocument()
    expect(email).toBeInTheDocument()

    removeTokenFromLocalStorage()
  })

  it('should redirect to login page', async () => {
    const push = jest.fn()
    void (useRouter as jest.Mock).mockReturnValue({ query: {}, push })

    render(<Profile />)

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/login')
    })
  })
})
