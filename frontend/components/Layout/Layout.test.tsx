import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@/test-utils'
import { Layout } from '@/components/Layout'

describe('Layout test cases', () => {
  const childElement = (
    <>
      <h1>Main article area</h1>
      <p>
        In this layout, we display the areas in source order for any screen less than 500 pixels wide. We go to a two
        column layout, and then to a three column layout by redefining the grid,and the placement of items on the grid.
      </p>
    </>
  )

  it('Render check', () => {
    const parentElement = <Layout>{childElement}</Layout>
    const { asFragment } = render(parentElement)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Theme toggle check', async () => {
    localStorage.setItem('courses-box-theme', 'light')
    void (window.matchMedia as jest.Mock).mockReturnValue({ matches: true })

    const parentElement = <Layout>{childElement}</Layout>
    render(parentElement)

    const themeToggler = screen.getByRole('button', { name: 'Moon' })
    expect(themeToggler).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(themeToggler)
    })

    expect(localStorage.getItem('courses-box-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Sun' })).toBeInTheDocument()
  })
})
