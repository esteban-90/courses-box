import { Logo } from '@/components/Logo'
import { render } from '@/tests/utils'

describe('Logo test cases:', () => {
  it('should check render', () => {
    const logoElement = <Logo>CoursesBox</Logo>
    const { asFragment } = render(logoElement)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should check render with custom size', async () => {
    const logoElement = <Logo size={10}>CoursesBox</Logo>
    const { asFragment } = render(logoElement)

    expect(asFragment()).toMatchSnapshot()
  })
})
