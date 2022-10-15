import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Tile as _Tile } from '@/components/Tile/Tile'

const CommonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  ${CommonStyles}
`

export const Tile = styled(_Tile)`
  ${CommonStyles}
  flex-flow: column;
`
