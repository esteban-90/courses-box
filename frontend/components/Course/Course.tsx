import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CourseProps } from '@/types'
import * as Styled from './Course.styled'

export const Course: FC<CourseProps> = ({ heading, image, link, children }): JSX.Element => {
  return (
    <Styled.Wrapper>
      <Link href={link} passHref>
        <Styled.Link>
          <h2>{heading}</h2>
          {/*eslint-disable-next-line jsx-a11y/alt-text*/}
          <Image {...image} />
          {children}
        </Styled.Link>
      </Link>
    </Styled.Wrapper>
  )
}
