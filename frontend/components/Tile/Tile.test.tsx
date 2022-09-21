import { render } from '@/test-utils'
import { Tile } from './Tile'

describe('Tile test cases', () => {
  it('Render check', () => {
    const { asFragment } = render(
      <Tile heading='Lorem ipsum dolor sit amet.'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium rem blanditiis exercitationem non tempora
        corrupti ratione distinctio aliquid id impedit eligendi libero expedita mollitia adipisci sint deleniti, beatae
        explicabo voluptatibus?
      </Tile>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
