import type { FC, ReactNode } from 'react'
import * as Styled from '@styled/Tile'

export type TileProps = {
  /** Title */
  heading?: ReactNode
  /** Text content */
  children: ReactNode
}

export const Tile: FC<TileProps> = ({ heading, children, ...rest }): JSX.Element => {
  return (
    <Styled.Wrapper {...rest}>
      <h2>{heading}</h2>
      {children}
    </Styled.Wrapper>
  )
}
