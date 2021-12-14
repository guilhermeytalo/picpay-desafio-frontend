import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    /* font-size: 62.5%; */
  }

  body {
    background: #F2F2F2;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Montserrat', serif;
    font-size: 16px;
  }

  button {
    cursor: pointer
  }
`;
