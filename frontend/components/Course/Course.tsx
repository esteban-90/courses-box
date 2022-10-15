import type { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import NextImage, { type ImageProps } from 'next/image'
import styled from '@emotion/styled'
import { strapiUrl } from '@/config'
import { Course as CourseType } from '@/types'
import * as Styled from '@styled/Course'

type CourseProps = {
  /** Course title */
  heading: string
  /** Course link */
  link: string
  /** Cover image */
  image: ImageProps
  /** Content */
  children: ReactNode
}

export const Course: FC<CourseProps> = ({ heading, image, link, children }): JSX.Element => {
  return (
    <NextLink href={link} passHref>
      <Styled.Wrapper>
        <Styled.Link>
          <h2>{heading}</h2>
          <NextImage {...image} alt={heading} />
          {children}
        </Styled.Link>
      </Styled.Wrapper>
    </NextLink>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vh 1vw;
`

export const Courses: FC<{ courses: CourseType[] }> = ({ courses }): JSX.Element => {
  return (
    <Wrapper>
      {courses.map(
        ({
          id,
          attributes: {
            title,
            subtitle,
            publishedAt,
            cover: {
              data: {
                attributes: {
                  formats: {
                    medium: { url, width, height },
                  },
                },
              },
            },
          },
        }) => (
          <Course
            key={id}
            heading={title}
            link={`/course/${id}`}
            image={{ width, height: '400px', alt: `Cover for ${title}`, src: `${strapiUrl}${url}` }}
          >
            <h3>{subtitle}</h3>
            <time dateTime={publishedAt}>{new Date(publishedAt).toDateString()}</time>
          </Course>
        )
      )}
    </Wrapper>
  )
}
