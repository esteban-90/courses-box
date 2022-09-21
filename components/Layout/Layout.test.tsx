import { render } from '@/test-utils'
import { Layout } from './Layout'

describe('Layout test cases', () => {
  const child = (
    <>
      <h1>Main article area</h1>
      <p>
        In this layout, we display the areas in source order for any screen less than 500 pixels wide. We go to a two
        column layout, and then to a three column layout by redefining the grid,and the placement of items on the grid.
      </p>
    </>
  )

  it('Render check', () => {
    const { asFragment } = render(
      <Layout
        onThemeToggle={function (): never {
          throw new Error('Function not implemented.')
        }}
        isDark
      >
        {child}
      </Layout>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
