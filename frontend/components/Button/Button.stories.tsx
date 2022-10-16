import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import { Button } from '@/components/Button'

export default {
  title: 'Controls/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} as ComponentMeta<typeof Button>

export const PrimaryButton: ComponentStoryObj<typeof Button> = {
  async play() {
    await userEvent.click(screen.getByRole('button'))
  },

  args: {
    action: 'primary',
  },
}

export const SecondaryButton: ComponentStoryObj<typeof Button> = {
  ...PrimaryButton,
  args: {
    action: 'secondary',
  },
}

export const WarningButton: ComponentStoryObj<typeof Button> = {
  ...PrimaryButton,
  args: {
    action: 'warning',
  },
}

export const DangerButton: ComponentStoryObj<typeof Button> = {
  ...PrimaryButton,
  args: {
    action: 'danger',
  },
}
