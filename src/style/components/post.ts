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
  box-sizing: initial;
`;
const LeftSide = styled('div')`
  padding: 10px 20px 0px 20px;
`;
const RightSide = styled('div')`
  flex: 1;
`;
const Header = styled('div')`
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
const Time = styled('span')`
`;
const SubHeader = styled('div')`
  font-size: small;
  color: ${colors.purple[0]};
`;
const Txid = styled('a')`
  ${transition}
  font-family: monospace;
  font-size: larger;
  margin-left: 5px;
  color: ${colors.purple[0]};
  &:hover {
    color: ${colors.purple[1]};
  }
`;

const Content = styled('div')`
  padding: 20px 0px 20px 0px;
  font-size: larger;
  font-family: Arial;
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