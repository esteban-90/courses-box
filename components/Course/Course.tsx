import { FC, ReactNode } from 'react'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import styled from '@emotion/styled'
import { Link as _Link } from '@/components/Link'
import { makeShadow } from '@/styles/helpers'

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  width: 94vw;

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2)
    return $shadow
  }};

  @media (min-width: 900px) {
    width: 46vw;
  }
`

const StyledLink = styled(_Link)`
  padding: 1vmin 4vmin;
`

type CourseProps = {
  /** Heading string */
  heading: string

  /** Image props */
  image: ImageProps

  /** Link address */
  link: string

  children: ReactNode
}

export const Course: FC<CourseProps> = ({ heading, image, link, children }): JSX.Element => {
  return (
    <StyledWrapper>
      <Link href={link} passHref>
        <StyledLink>
          <h2>{heading}</h2>
          {/*eslint-disable-next-line jsx-a11y/alt-text*/}
          <Image {...image} />
          {children}
        </StyledLink>
      </Link>
    </StyledWrapper>
  )
}
