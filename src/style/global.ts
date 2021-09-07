import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    font-size: larger;
  }

  a {
    all: unset;
    cursor: pointer;
  }

  main {
    padding: 10px;
  }

  .mobile {
    @media only screen and (min-width: 724px){
      display: none;
    }
  }
  .desktop {
    @media only screen and (max-width: 724px){
      display: none !important;
    }
  }
`;

export default GlobalStyles;