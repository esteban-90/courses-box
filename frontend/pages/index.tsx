import type { NextPage } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Course } from '@/components'

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vh 1vw;
`

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>CoursesBox</title>
        <meta name='description' content='IT Courses for everyone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <StyledWrapper>
        {new Array(4).fill(null).map((_, index) => (
          <Course
            key={index}
            heading='Hands-On React. Build advanced React JS Frontend with expert'
            link='hands-on-reactjs'
            image={{
              width: 1368,
              height: 770,
              alt: 'Logo for Hands-On React',
              src: '/covers/hands-on_reactjs_cover.png',
            }}
          >
            <>
              <p>
                React is the most popular library for building frontend web applicartions. Step-by-step by dividing into
                all the basics, I&apos;ll introduce you to advanced concepts as well. We&apos;ll build the minesweeper
                application from scratch:
              </p>
              <ul>
                <li>setup of the development environment</li>
                <li>configuration of the React JS app</li>
                <li>basic algorithms of Minesweeper</li>
              </ul>
            </>
          </Course>
        ))}
      </StyledWrapper>
    </>
  )
}

export default Home
