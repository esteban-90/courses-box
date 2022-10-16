import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import { Switch } from '@/components/Switch'

export default {
  title: 'Controls/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

export const BasicSwitch: ComponentStoryObj<typeof Switch> = {
  async play() {
    await userEvent.click(screen.getByTestId('switchVisiblePart'))
  },
}
