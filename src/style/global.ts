import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    font-size: larger;
  }

  a {
    text-decoration: none;
  }

  main {
    padding: 10px;
  }

  /* CardHeader */
  .MuiCardHeader-title {
    font-family: monospace;
    color: ${({ theme }) => theme.blue};
  }
`;

export default GlobalStyles;