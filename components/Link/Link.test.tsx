import { render } from '@/test-utils'
import { Link } from './Link'

describe('Link test cases', () => {
  it('Render check', () => {
    const { asFragment } = render(
      <Link href='/hands-on-reactjs'>Hands-On React. Build advanced React JS Frontend with expert</Link>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
