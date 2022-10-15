import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Courses } from '@/components'
import type { Course as CourseType } from '@/types'
import { getCourses } from '@/utils'

export const getStaticProps: GetStaticProps = async () => {
  const { data: courses, error } = await getCourses()
  if (error) return { props: { courses: [] } }
  return { props: { courses } }
}

const Home: NextPage<{ courses: CourseType[] }> = ({ courses }): JSX.Element => {
  return (
    <>
      <Head>
        <title>CoursesBox</title>
        <meta name='description' content='IT Courses for everyone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Courses courses={courses} />
    </>
  )
}

export default Home
