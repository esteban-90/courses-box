import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { screen, userEvent } from '@storybook/testing-library'
import { IconButton } from './IconButton'

export default {
  title: 'Controls/IconButton',
  component: IconButton,
  args: {
    children: 'IconButton',
  },
} as ComponentMeta<typeof IconButton>

export const BasicIconButton: ComponentStoryObj<typeof IconButton> = {
  async play({ args }) {
    await userEvent.click(screen.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
  },

  args: {
    name: 'Home',
  },
}
