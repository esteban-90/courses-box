import { Link } from '@/components/Link'
import { render } from '@/tests/utils'

describe('Link test cases:', () => {
  it('should check render', () => {
    const linkElement = (
      <Link href='/hands-on-reactjs'>Hands-On React. Build advanced React JS Frontend with expert</Link>
    )

    const { asFragment } = render(linkElement)
    expect(asFragment()).toMatchSnapshot()
  })
})
