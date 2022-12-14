import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
// import { expect } from '@storybook/jest'
import { screen, userEvent } from '@storybook/testing-library'
import { Checkbox } from '@/components/Checkbox'

export default {
  title: 'Controls/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

export const BasicCheckbox: ComponentStoryObj<typeof Checkbox> = {
  async play({ args }) {
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    // @todo: https://github.com/storybookjs/storybook/issues/16941
    // await expect(args.onChange).toHaveBeenCalled()
  },
}
