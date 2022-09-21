import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { screen } from '@storybook/testing-library'
import { Link } from './Link'

export default {
  title: 'Content/Link',
  component: Link,
} as ComponentMeta<typeof Link>

export const BasicLink: ComponentStoryObj<typeof Link> = {
  async play() {
    await expect(screen.getByRole('link')).toBeInTheDocument()
  },

  args: {
    children: 'Hands-On React. Build advanced React JS Frontend with expert',
    href: '/hands-on-reactjs',
  },
}
