import {AppBar, Button, IconButton, Card} from '@material-ui/core';
import styled from 'styled-components';
import {colors} from '../constants/colors';

const AppBarS = styled(AppBar)`
  transition: background 0.2s ease-in, color 0.2s ease-in;
  background-color: ${({ theme }) => theme.bodyBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 2px 4px ${colors.purple[1]};
`;

const ButtonS = styled(Button)`
  transition: background 0.2s ease-in, color 0.2s ease-in;
  color: ${colors.purple[0]};
  &:hover {
    color: ${colors.purple[2]};
  }
`;

const IconButtonS = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

const CardPostS = styled(Card)`
  margin-top: 3px;
  border: 1px solid ${colors.purple[0]};
  background-color: 
`;

export {AppBarS, ButtonS, IconButtonS, CardPostS};