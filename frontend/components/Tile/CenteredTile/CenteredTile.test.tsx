import { CenteredTile } from '@/components/Tile'
import { render } from '@/utils'

describe('Centered Tile test cases', () => {
  it('Render check', () => {
    const centeredTileElement = (
      <CenteredTile heading='Lorem ipsum dolor sit amet'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </CenteredTile>
    )

    const { asFragment } = render(centeredTileElement)
    expect(asFragment()).toMatchSnapshot()
  })
})
