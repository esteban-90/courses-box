import { MouseEvent, ChangeEvent, ChangeEventHandler, InputHTMLAttributes, ReactNode, SVGProps } from 'react'
import { ImageProps } from 'next/image'
import { SerializedError } from '@reduxjs/toolkit'
import * as Icons from '@/components/Icon/Icons'

export type ButtonProps = {
  /** Text in the button */
  children: string
  /** Button color */
  color?: 'primary' | 'secondary' | 'danger' | 'warning'
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export type DefinedButton = Omit<ButtonProps, 'color'>

export type CheckboxProps = {
  /** Change handler */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export type CourseProps = {
  /** Heading string */
  heading: string
  /** Image props */
  image: ImageProps
  /** Link address */
  link: string
  /** Children elements */
  children: ReactNode
}

export type IconProps = {
  /** Icon name */
  name: keyof typeof Icons
  /** Width and height */
  size?: number
} & SVGProps<SVGSVGElement>

export type IconButtonProps = {
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
} & Omit<IconProps, 'ref'>

export type FeedbackProps = {
  /** Is valid feedback */
  isValid?: boolean
}

export type InputWrapperProps = {
  /** Input height */
  height?: number
  /** Input width */
  width?: number
  /** Label visibility */
  isLabelVisible?: boolean
  /** Feedback visibility */
  isFeedbackVisible?: boolean
}

export type InputProps = {
  /** Input placeholder */
  placeholder: string
  /** Change handler */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Input label */
  label?: string
  /** Icon */
  icon?: keyof typeof Icons
  /** Feedback for input */
  feedback?: ReactNode
} & InputWrapperProps &
  InputHTMLAttributes<HTMLInputElement>

export type LayoutProps = {
  /** Children elements */
  children: ReactNode
}

export type LinkProps = {
  /** Is underline or not */
  underline?: boolean
}

export type LogoProps = {
  /** Logo size */
  size?: number
}

export type SwitchProps = {
  /** Change handler */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export type TileProps = {
  /** Heading */
  heading: ReactNode
  /** Text in the tile */
  children: ReactNode
}

export type LoginData = {
  /** User's email or username */
  identifier: string
  /** User's password */
  password: string
}

export type RegisterData = {
  /** User's email */
  email: string
  /** User's username */
  username: string
  /** User's password */
  password: string
  /** Password confirmation */
  passwordConfirmation: string
}

export type UserState = {
  /** JWT token */
  jwt: string
  /** Request state */
  requestState?: 'pending' | 'fullfilled' | 'rejected'
  /** Error */
  error?: SerializedError
} & Omit<RegisterData, 'password' | 'passwordConfirmation'>

export type UserPayload = {
  jwt: string
  user: Omit<RegisterData, 'password' | 'passwordConfirmation'>
}
