import { render } from '@/test-utils'
import { CenteredTile } from '@/components/Tile'

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
