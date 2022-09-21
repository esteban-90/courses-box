import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'
import { makeShadow } from '@/styles/helpers'

const StyledWrapper = styled.section`
  padding: 1vmin 4vmin 4vmin;
  border-radius: 1rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2)
    return $shadow
  }};
`

type TileProps = {
  /** Heading string */
  heading: string

  /** Text in the tile */
  children: ReactNode
}

export const Tile: FC<TileProps> = ({ heading, children }): JSX.Element => {
  return (
    <StyledWrapper>
      <h2>{heading}</h2>
      {children}
    </StyledWrapper>
  )
}
