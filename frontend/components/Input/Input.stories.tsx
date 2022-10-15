import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import { Input, Feedback } from '@/components/Input'

export default {
  title: 'Controls/Input',
  component: Input,
  args: {},
} as ComponentMeta<typeof Input>

export const PrimaryInput: ComponentStoryObj<typeof Input> = {
  async play() {
    await userEvent.type(screen.getByRole('textbox'), 'String')
  },

  args: {
    placeholder: 'Your name',
    label: 'Name:',
  },
}

export const WithIcon: ComponentStoryObj<typeof Input> = {
  args: {
    icon: 'Search',
    placeholder: 'Search',
    height: 4,
  },
}

export const WithValidFeedback: ComponentStoryObj<typeof Input> = {
  args: {
    placeholder: 'Some text',
    label: 'Text:',
    feedback: <Feedback isValid>Looks good!</Feedback>,
  },

  argTypes: {
    feedback: {
      control: false,
    },
  },
}

export const WithInvalidFeedback: ComponentStoryObj<typeof Input> = {
  args: {
    placeholder: 'Some text',
    feedback: <Feedback>Required!</Feedback>,
  },

  argTypes: {
    feedback: {
      control: false,
    },
  },
}
