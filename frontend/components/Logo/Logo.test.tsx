import { render } from '@/test-utils'
import { Logo } from '@/components/Logo'

describe('Logo test cases', () => {
  it('Render check', () => {
    const logoElement = <Logo>CoursesBox</Logo>
    const { asFragment } = render(logoElement)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Render with custom size', async () => {
    const logoElement = <Logo size={10}>CoursesBox</Logo>
    const { asFragment } = render(logoElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
