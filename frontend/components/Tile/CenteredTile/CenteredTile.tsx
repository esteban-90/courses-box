import type { FC } from 'react'
import type { TileProps } from '@/components/Tile/Tile'
import * as Styled from '@styled/CenteredTile'

export const CenteredTile: FC<TileProps> = ({ children, heading, ...rest }): JSX.Element => {
  return (
    <Styled.Wrapper {...rest}>
      <Styled.Tile heading={heading}>{children}</Styled.Tile>
    </Styled.Wrapper>
  )
}
