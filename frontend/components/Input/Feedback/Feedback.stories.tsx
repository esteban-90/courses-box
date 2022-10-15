import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { screen } from '@storybook/testing-library'
import { Feedback } from '@/components/Input'

export default {
  title: 'Controls/Feedback',
  component: Feedback,
} as ComponentMeta<typeof Feedback>

export const ValidFeedback: ComponentStoryObj<typeof Feedback> = {
  async play() {
    await expect(screen.getByText('Looks good!')).toBeInTheDocument()
  },

  args: {
    children: 'Looks good!',
    isValid: true,
  },
}

export const InvalidFeedback: ComponentStoryObj<typeof Feedback> = {
  async play() {
    await expect(screen.getByText('Please provide a valid value')).toBeInTheDocument()
  },

  args: {
    children: 'Please provide a valid value',
  },
}
