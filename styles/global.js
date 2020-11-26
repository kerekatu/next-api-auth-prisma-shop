import { css } from '@emotion/react'

const globalStyles = css`
  :root {
    --color-black: #000;
    --color-black-rgb: 0, 0, 0;
    --color-gray: #414141;
    --color-white: #fff;
    --color-white-rgb: 255, 255, 255;

    --font: 'Lato', sans-serif;
    --font-size: 1.6rem;
    --font-size-2: 1.8rem;
    --font-size-3: 2.4rem;
    --font-size-4: 4.2rem;
    --line-height: 1.58;
    --line-height-2: 1.2;

    --page-width: 92rem;
    --border-radius: 0.4rem;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    background-color: var(--color-black);
  }

  body {
    min-height: 100vh;
    font-size: var(--font-size);
    font-family: var(--font);
    font-weight: 400;
    text-rendering: optimizelegibility;
    line-height: var(--line-height);
    color: var(--color-white);
  }

  button,
  input,
  textarea {
    font-size: var(--font-size);
    font-family: var(--font);
    line-height: 1;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: default;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  h1 {
    font-size: var(--font-size-4);
  }

  h2 {
    font-size: var(--font-size-3);
  }

  h3 {
    font-size: var(--font-size-2);
  }

  .error {
    color: var(--color-red);
  }

  .container {
    width: var(--page-width);
    margin: 0 auto;
  }
`

export default globalStyles
