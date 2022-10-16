import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import { Checkbox } from '@/components/Checkbox'

export default {
  title: 'Controls/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

export const BasicCheckbox: ComponentStoryObj<typeof Checkbox> = {
  async play() {
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
  },
}
