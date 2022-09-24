import { FC, forwardRef, ForwardedRef } from 'react'
import { Icon } from '@/components/Icon'
import { IconButtonProps } from '@/types'
import * as Styled from './IconButton.styled'

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
