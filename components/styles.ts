import { css, SerializedStyles } from '@emotion/react'
import { AppTheme } from '@/styles/themes'

export type Color = 'primary' | 'secondary' | 'danger' | 'warning'

export const boxShadow = (shadowColor1: string, shadowColor2: string, inset = false): SerializedStyles => {
  const insetStr = inset ? 'inset' : false

  return css`
    box-shadow: 0.5vmin 0.5vmin 1vmin ${shadowColor1} ${insetStr}, -0.5vmin -0.5vmin 1vmin ${shadowColor2} ${insetStr};
  `
}

export const transition = (): SerializedStyles => {
  return css`
    transition: all 0.4s ease;
  `
}

export const getColors = (theme: AppTheme, color?: Color): SerializedStyles => {
  switch (color) {
    case 'secondary':
      return css`
        color: ${theme.font.regular};
      `

    case 'primary':
    case 'danger':
      return css`
        background: ${theme.components[color]};
        color: ${theme.font.button};
      `

    case 'warning':
      return css`
        background: ${theme.components[color]};
        color: ${theme.font.warning};
      `

    default:
      return css``
  }
}
