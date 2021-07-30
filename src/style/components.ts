import {AppBar} from '@material-ui/core';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const AppBarS = styled(AppBar)`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 2px 4px -1px ${({ theme }) => theme.shadow};
`

export {Title, AppBarS};