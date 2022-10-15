import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import { IconButton } from '@/components/IconButton'

export default {
  title: 'Controls/IconButton',
  component: IconButton,
  args: {
    children: 'IconButton',
  },
} as ComponentMeta<typeof IconButton>

export const BasicIconButton: ComponentStoryObj<typeof IconButton> = {
  async play() {
    await userEvent.click(screen.getByRole('button'))
  },

  args: {
    name: 'Home',
  },
}
