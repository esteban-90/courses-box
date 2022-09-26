import { FC } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { CourseProps } from '@/types'
import * as Styled from './Course.styled'

export const Course: FC<CourseProps> = ({ heading, image, link, children }): JSX.Element => {
  return (
    <Styled.Wrapper>
      <NextLink href={link} passHref>
        <Styled.Link>
          <h2>{heading}</h2>
          <NextImage {...image} alt={heading} />
          {children}
        </Styled.Link>
      </NextLink>
    </Styled.Wrapper>
  )
}
