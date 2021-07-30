import styled from 'styled-components';
import {colors, transition} from '../../constants/colors';

const Post = styled('div')`
  ${transition}
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
  border: 1px solid ${colors.blue[1]};
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  padding: 10px 10px 10px 0px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
`;
const LeftSide = styled('div')`
  padding: 10px 20px 0px 20px;
`;
const RightSide = styled('div')``;
const Header = styled('div')`
`;
const UserAddr = styled('span')`
  font-weight: bold;
  font-family: monospace;
`;
const Time = styled('span')`
`;
const SubHeader = styled('div')`
  font-size: small;
`;
const Txid = styled('span')`
  font-family: monospace;
  font-size: larger;
`;

const Content = styled('div')`
  padding: 20px 0px 20px 0px;
  font-size: larger;
`;

export {
  Post,
  LeftSide,
  RightSide,
  Header,
  SubHeader,
  Txid,
  UserAddr,
  Time,
  Content
};