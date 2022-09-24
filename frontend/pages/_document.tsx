import { Html, Head, Main, NextScript } from 'next/document'
import { Global } from '@emotion/react'
import { GlobalStyles } from '@/styles/global'

export default function Document(): JSX.Element {
  const initialTheme = `
    var savedTheme = localStorage.getItem("courses-box-theme");
    var savedThemeExists = savedTheme !== null;
    var savedThemeIsDark = savedTheme === "dark";
    var preferenceIsDark = window.matchMedia("prefers-color-scheme: dark").matches;
    var themeIsDark = savedThemeExists ? savedThemeIsDark : preferenceIsDark;
    var backgroundColor = themeIsDark ? "#5e5c64" : "#e4ebf5";
    var textColor = themeIsDark ? "#e4ebf5e6" : "#504e55e6";

    document.documentElement.style.setProperty("--themeBackgroundColor", backgroundColor);
    document.documentElement.style.setProperty("--themeColor", textColor);
  `

  return (
    <Html>
      <Head>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Monoton&family=Poppins&display=swap' />
        <script dangerouslySetInnerHTML={{ __html: initialTheme }} />
        <Global styles={GlobalStyles} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
