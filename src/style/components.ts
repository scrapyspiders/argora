import {AppBar, Button, IconButton} from '@material-ui/core';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const AppBarS = styled(AppBar)`
  transition: background 0.2s ease-in, color 0.2s ease-in;
  background-color: ${({ theme }) => theme.bodyBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 2px 4px -1px ${({ theme }) => theme.shadow};
`;

const ButtonS = styled(Button)`
  transition: background 0.2s ease-in, color 0.2s ease-in;
  color: ${({ theme }) => theme.button};
  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const IconButtonS = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

export {Title, AppBarS, ButtonS, IconButtonS};