import { FC } from 'react'
import styled from '@emotion/styled'
import { IconProps } from '@/types'
import * as Icons from './Icons'

// https://reactsvgicons.com/search

export const Icon: FC<IconProps> = ({ name, size = 2, ...rest }): JSX.Element => {
  const DefinedIcon = styled(Icons[name])`
    color: ${({ theme }) => theme.font.regular};
  `

  return <DefinedIcon role='img' aria-label={name} width={`${size}rem`} height={`${size}rem`} {...rest} />
}
