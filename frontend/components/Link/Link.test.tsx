import { render } from '@/test-utils'
import { Link } from '@/components/Link'

describe('Link test cases', () => {
  it('Render check', () => {
    const linkElement = (
      <Link href='/hands-on-reactjs'>Hands-On React. Build advanced React JS Frontend with expert</Link>
    )

    const { asFragment } = render(linkElement)
    expect(asFragment()).toMatchSnapshot()
  })
})
