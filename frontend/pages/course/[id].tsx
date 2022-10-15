import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from '@emotion/styled'
import MarkdownIt from 'markdown-it'
import { CenteredTile, Link as CustomLink } from '@/components'
import { strapiUrl } from '@/config'
import { getCourses, getCourseById } from '@/utils'
import type { Course as CourseType } from '@/types'

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: courses, error } = await getCourses()

  const fallback = true
  if (error) return { paths: [], fallback }

  const paths = courses.map(({ id }) => `/course/${id}`)
  return { paths, fallback }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const { data: course, error } = await getCourseById(id as string)

  if (error) return { props: { course: {}, meta: {} } }
  const md = new MarkdownIt()

  return {
    props: {
      course: {
        ...course,
        attributes: {
          ...course.attributes,
          description: md.render(course.attributes.description),
        },
      },
    },
  }
}

const StyledWrapper = styled.div<{ maxWidth: number }>`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;
  height: 25vw;
`

const Course: NextPage<{ course: CourseType }> = ({ course }): JSX.Element | null => {
  if (course && course?.attributes) {
    const {
      attributes: {
        title,
        link,
        description,
        publishedAt,
        cover: {
          data: {
            attributes: {
              formats: {
                large: { url, width },
              },
            },
          },
        },
      },
    } = course

    return (
      <>
        <Head>
          <title>Course: {title}</title>
          <meta name='description' content={title} />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <CenteredTile>
          <StyledWrapper maxWidth={width}>
            <Image layout='fill' alt={`Cover for ${title}`} src={`${strapiUrl}${url}`} objectFit='contain' />
          </StyledWrapper>
          <Link href={link} passHref>
            <CustomLink isUnderline target='_blank' style={{ marginTop: '1rem' }}>
              Enroll now!
            </CustomLink>
          </Link>
          <div style={{ maxWidth: width, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: description }} />
          <span>{new Date(publishedAt).toDateString()}</span>
        </CenteredTile>
      </>
    )
  }

  return null
}

export default Course
