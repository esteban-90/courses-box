import type { FC, SVGProps } from 'react'
import styled from '@emotion/styled'
import * as Icons from '@icons'

export type IconNames = keyof typeof Icons

export type IconProps = {
  /** Icon name */
  name: IconNames
  /** Width and height */
  size?: number
} & SVGProps<SVGSVGElement>

/**
 * @see {@link https://reactsvgicons.com/search ReactSVGIcons}
 */

export const Icon: FC<IconProps> = ({ name, size = 2, ...rest }): JSX.Element => {
  const DefinedIcon = styled(Icons[name])`
    color: ${({ theme }) => theme.font.regular};
  `

  return <DefinedIcon role='img' aria-label={name} width={`${size}rem`} height={`${size}rem`} {...rest} />
}
