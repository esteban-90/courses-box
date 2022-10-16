import type { FC, MouseEventHandler, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Icon, type IconProps } from '@/components/Icon'
import * as Styled from '@styled/IconButton'

type IconButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
} & Omit<IconProps, 'ref'>

export const IconButton: FC<IconButtonProps> = forwardRef(({ onClick, ...rest }, ref): JSX.Element => {
  return (
    <Styled.Button
      onClick={onClick}
      size={(rest.size ?? 2) * 2}
      title={rest.name}
      ref={ref as ForwardedRef<HTMLButtonElement>}
    >
      <Icon {...rest} />
    </Styled.Button>
  )
})

IconButton.displayName = 'IconButton'
