import { FC } from 'react'
import { TileProps } from '@/types'
import * as Styled from './CenteredTile.styled'

export const CenteredTile: FC<TileProps> = ({ children, heading, ...rest }): JSX.Element => {
  return (
    <Styled.Wrapper {...rest}>
      <Styled.Tile heading={heading}>{children}</Styled.Tile>
    </Styled.Wrapper>
  )
}
