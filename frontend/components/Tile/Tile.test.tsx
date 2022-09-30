import { Tile } from '@/components/Tile'
import { render } from '@/utils'

describe('Tile test cases', () => {
  it('Render check', () => {
    const tileElement = (
      <Tile heading='Lorem ipsum dolor sit amet.'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium rem blanditiis exercitationem non tempora
        corrupti ratione distinctio aliquid id impedit eligendi libero expedita mollitia adipisci sint deleniti, beatae
        explicabo voluptatibus?
      </Tile>
    )

    const { asFragment } = render(tileElement)
    expect(asFragment()).toMatchSnapshot()
  })
})
