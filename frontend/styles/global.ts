import { css } from '@emotion/react'

export const GlobalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Monoton&family=Poppins&display=swap');

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: var(--themeBackgroundColor);
    color: var(--themeColor);
  }
`
