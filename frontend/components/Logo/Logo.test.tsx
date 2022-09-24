import { render } from '@/test-utils'
import { Logo } from '@/components/Logo'

describe('Logo test cases', () => {
  it('Render check', () => {
    const element = <Logo>CoursesBox</Logo>
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })

  it('Render with custom size', async () => {
    const element = <Logo size={10}>CoursesBox</Logo>
    const { asFragment } = render(element)

    expect(asFragment()).toMatchSnapshot()
  })
})
