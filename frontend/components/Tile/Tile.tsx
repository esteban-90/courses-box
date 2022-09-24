import { FC } from 'react'
import { TileProps } from '@/types'
import * as Styled from './Tile.styled'

export const Tile: FC<TileProps> = ({ heading, children, ...rest }): JSX.Element => {
  return (
    <Styled.Wrapper {...rest}>
      <h2>{heading}</h2>
      {children}
    </Styled.Wrapper>
  )
}
