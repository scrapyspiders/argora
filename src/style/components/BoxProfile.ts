import styled from 'styled-components';
import {colors, transition} from '../../constants';

const Box = styled('div')`
  ${transition}
  color: ${({theme}) => theme.text};
  padding: 10px 10px 10px 0px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
  box-sizing: initial;
  text-align: center;
`;

const UserAddr = styled('a')`
  ${transition}
  font-weight: bold;
  font-family: monospace;
  color: ${colors.blue[1]};
  &:hover {
    color: ${colors.blue[2]};
  }
`;

export {Box, UserAddr};