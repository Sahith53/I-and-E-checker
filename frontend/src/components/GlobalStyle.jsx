import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
  }

  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  input, textarea {
    font-size: 1rem;
  }

  button {
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default GlobalStyle;
