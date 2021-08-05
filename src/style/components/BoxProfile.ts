import styled from 'styled-components';
import {transition} from '../../constants';

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

export {Box};