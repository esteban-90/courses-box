import { Course } from '@/components/Course'
import { render } from '@/tests/utils'

describe('Course test cases:', () => {
  it('should check render', () => {
    const courseContent = (
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

    const courseElement = (
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
        {courseContent}
      </Course>
    )

    const { asFragment } = render(courseElement)
    expect(asFragment()).toMatchSnapshot()
  })
})
