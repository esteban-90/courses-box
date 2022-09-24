import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { screen } from '@storybook/testing-library'
import { Tile } from '@/components/Tile'

export default {
  title: 'Content/Tile',
  component: Tile,
} as ComponentMeta<typeof Tile>

export const BasicTile: ComponentStoryObj<typeof Tile> = {
  async play() {
    await expect(screen.getByRole('heading')).toBeInTheDocument()
  },

  args: {
    heading: 'Lorem ipsum dolor sit amet.',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultricies scelerisque purus at egestas. Duis sagittis ullamcorper velit in vehicula. Aliquam odio sapien, maximus ac nisl id, sollicitudin pretium massa. Praesent eu vehicula diam. Fusce eu est urna. Phasellus iaculis, dui eu elementum imperdiet, sapien ante rutrum ligula, nec vulputate est lorem quis turpis. Pellentesque in velit in metus gravida interdum. Sed placerat orci at posuere pellentesque. Pellentesque at nulla quis enim malesuada efficitur. In hac habitasse platea dictumst. Nullam nisi justo, feugiat et dui nec, porta interdum elit. Morbi placerat nec magna nec aliquet. Proin facilisis nibh sit amet porttitor tempus. Duis et pellentesque magna. Integer sit amet magna pharetra, ultrices massa vitae, accumsan urna. Integer congue, nisl finibus euismod pulvinar, orci diam egestas diam, a hendrerit neque eros dignissim enim. Maecenas condimentum placerat sem sed iaculis. Sed et magna nulla. Praesent id purus in mauris rutrum consectetur. Sed accumsan mi vel enim ullamcorper gravida. Donec vel molestie nulla, in dignissim arcu. Phasellus nec libero vulputate orci cursus imperdiet. Nullam nec ex metus. Morbi maximus aliquam dui a mattis. Nulla faucibus, ipsum et lobortis iaculis, felis quam accumsan risus, a dignissim elit erat et nibh. Sed vestibulum, leo quis tempor congue, risus lorem tincidunt lacus, ut hendrerit purus sapien quis mauris. Integer molestie dui massa, at hendrerit magna convallis ornare. Suspendisse potenti. Cras pretium lectus quis mauris placerat molestie. Phasellus nec faucibus felis. Nullam et hendrerit quam. Nunc id ultricies ipsum. Proin ac placerat eros. Etiam metus nisl, pretium nec velit id, posuere feugiat turpis. Nulla facilisi. Pellentesque at posuere dolor.',
  },
}

export const BasicTileWithSmallAmountOfContent: ComponentStoryObj<typeof Tile> = {
  ...BasicTile,

  args: {
    heading: 'Lorem ipsum dolor sit amet',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
}
