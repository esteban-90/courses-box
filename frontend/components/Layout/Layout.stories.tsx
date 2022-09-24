import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { screen } from '@storybook/testing-library'
import { Layout } from '@/components/Layout'

export default {
  title: 'Content/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>

const child = (
  <>
    <h1>Main article area</h1>
    <p>
      In this layout, we display the areas in source order for any screen less than 500 pixels wide. We go to a two
      column layout, and then to a three column layout by redefining the grid,and the placement of items on the grid.
    </p>
  </>
)

export const BasicLayout: ComponentStoryObj<typeof Layout> = {
  async play() {
    await expect(screen.getByText('Main article area')).toBeInTheDocument()
  },

  args: {
    children: child,
  },
}
