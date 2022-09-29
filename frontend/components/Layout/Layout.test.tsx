import userEvent from '@testing-library/user-event'
import { Layout } from '@/components/Layout'
import { render, screen, act } from '@/utils'

describe('Layout test cases', () => {
  const layoutContent = (
    <>
      <h1>Main article area</h1>
      <p>
        In this layout, we display the areas in source order for any screen less than 500 pixels wide. We go to a two
        column layout, and then to a three column layout by redefining the grid,and the placement of items on the grid.
      </p>
    </>
  )

  const layoutElement = <Layout>{layoutContent}</Layout>

  it('Render check', () => {
    const { asFragment } = render(layoutElement)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Theme toggle check', async () => {
    localStorage.setItem('courses-box-theme', 'light')
    void (window.matchMedia as jest.Mock).mockReturnValue({ matches: true })
    render(layoutElement)

    const themeToggler = screen.getByRole('button', { name: 'Moon' })
    expect(themeToggler).toBeInTheDocument()

    await act(async () => await userEvent.click(themeToggler))
    expect(localStorage.getItem('courses-box-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Sun' })).toBeInTheDocument()
  })
})
