import styled from '@emotion/styled'

type LogoProps = {
  /** Logo size */
  size?: number
}

export const Logo = styled.header<LogoProps>`
  font-family: 'Monoton', cursive;
  font-size: ${({ size = 3 }) => `${size}rem`};
  color: ${({ theme }) => theme.font.logo};

  text-shadow: ${({ theme, size = 3 }) => {
    const { logoShadow1, logoShadow2 } = theme.font
    const $shadow = `
        0 0 ${0.1 * size}rem ${logoShadow1},
        0 0 ${0.05 * size}rem ${logoShadow2},
        0 0 ${0.07 * size}rem ${logoShadow2},
        0 0 ${0.08 * size}rem ${logoShadow2},
        0 0 ${0.1 * size}rem ${logoShadow2};
      `

    return $shadow
  }};
`
