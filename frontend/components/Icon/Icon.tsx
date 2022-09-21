import { FC, SVGProps } from 'react'
import styled from '@emotion/styled'
import * as Icons from './Icons'

export type AvailableIcons = keyof typeof Icons

export type IconProps = {
  /** Icon name */
  name: AvailableIcons

  /** Width and height */
  size?: number
} & SVGProps<SVGSVGElement>

// https://reactsvgicons.com/search

export const Icon: FC<IconProps> = ({ name, size = 2, ...rest }) => {
  const $Icon = styled(Icons[name])`
    color: ${({ theme }) => theme.font.regular};
  `
  const sizes = { width: `${size}rem`, height: `${size}rem` }

  return <$Icon role='img' aria-label={name} {...sizes} {...rest} />
}
