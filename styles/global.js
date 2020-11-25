import { css } from '@emotion/react'

const globalStyles = css`
  :root {
    --color-black: #000;
    --color-gray: #414141;
    --color-white: #fff;

    --font: 'Lato', sans-serif;
    --font-size: 1.4rem;
    --font-size-2: 2.5rem;
    --line-height: 1.58;
    --line-height-2: 1.2;

    --page-width: 92rem;
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

  .error {
    color: var(--color-red);
  }

  .container {
    width: var(--page-width);
    margin: 0 auto;
  }
`

export default globalStyles
