import { expect } from '@storybook/jest'
import { screen } from '@storybook/testing-library'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { CenteredTile } from '@/components/Tile'

export default {
  title: 'Content/Tile',
  component: CenteredTile,
} as ComponentMeta<typeof CenteredTile>

export const CenteredTileExample: ComponentStoryObj<typeof CenteredTile> = {
  async play() {
    await expect(screen.getByRole('heading')).toBeInTheDocument()
  },

  args: {
    heading: 'Lorem ipsum dolor sit amet',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
}
