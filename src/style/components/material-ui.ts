import {AppBar, Button, IconButton, Card} from '@material-ui/core';
import styled from 'styled-components';
import {colors, transition} from '../../constants/colors';

const AppBarS = styled(AppBar)`
  ${transition}
  background-color: ${({ theme }) => theme.bodyBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 2px 4px ${colors.purple[1]};
`;

const ButtonS = styled(Button)`
  ${transition}
  color: ${colors.purple[0]};
  &:hover {
    color: ${colors.purple[2]};
  }
`;

const IconButtonS = styled(IconButton)`
  ${transition}
  color: ${({ theme }) => theme.text};
`;

const CardPostS = styled(Card)`
  ${transition}
  margin-top: 10px;
  border: 1px solid ${colors.purple[0]};
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
`;

export {AppBarS, ButtonS, IconButtonS, CardPostS};