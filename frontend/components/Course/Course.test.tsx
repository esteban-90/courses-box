import { render } from '@/test-utils'
import { Course } from '@/components/Course'

describe('Course test cases', () => {
  it('Render check', () => {
    const childElement = (
      <>
        <p>
          React is the most popular library for building frontend web applicartions. Step-by-step by dividing into all
          the basics, I&apos;ll introduce you to advanced concepts as well. We&apos;ll build the minesweeper application
          from scratch:
        </p>
        <ul>
          <li>setup of the development environment</li>
          <li>configuration of the React JS app</li>
          <li>basic algorithms of Minesweeper</li>
        </ul>
      </>
    )

    const parentElement = (
      <Course
        heading='Hands-On React. Build advanced React JS Frontend with expert'
        link='hands-on-reactjs'
        image={{
          width: 1368,
          height: 770,
          alt: 'Logo for Hands-On React',
          src: '/covers/hands-on_reactjs_cover.png',
        }}
      >
        {childElement}
      </Course>
    )

    const { asFragment } = render(parentElement)
    expect(asFragment()).toMatchSnapshot()
  })
})
