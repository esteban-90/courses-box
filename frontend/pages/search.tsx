import type { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Courses } from '@/components'
import type { Course as CourseType } from '@/types'
import { getCoursesByQuery } from '@/utils'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context.query?.q as string
  if (!q) return { props: { courses: [] } }

  const { data: courses, error } = await getCoursesByQuery(q)
  if (error) return { props: { error } }

  return { props: { courses } }
}

const StyledHeading = styled.h3`
  padding: 0 2vmin;
`

const renderHeading = (q: string, courses?: CourseType[], error?: string) => {
  if (error) return error
  return courses?.length ? `Search results for "${q}"` : `No results for "${q}"... 😥`
}

const Search: NextPage<{ courses?: CourseType[]; error?: string }> = ({
  courses: ssrCourses,
  error: ssrError,
}): JSX.Element => {
  const router = useRouter()
  const { q } = router.query

  const [courses, setCourses] = useState<CourseType[] | undefined>(ssrCourses)
  const [error, setError] = useState<string | undefined>(ssrError)

  useEffect(() => {
    void (async () => {
      const { data: c, error: e } = await getCoursesByQuery(String(q))

      setCourses(c)
      setError(e)
    })()
  }, [q])

  return (
    <>
      <StyledHeading>{renderHeading(q as string, courses, error)}</StyledHeading>
      {courses && <Courses courses={courses} />}
    </>
  )
}

export default Search
