import styled from 'styled-components';
import {colors, transition} from '../../constants';
import {Link} from 'react-router-dom';

const Box = styled('div')`
  ${transition}
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
  border: 1px solid ${({ theme }) => theme.blueInvert};
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  padding: 10px 10px 10px 0px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
  box-sizing: initial;

  &:hover {
    transition: border-color 0s, opacity 0s;
    border-color: ${({theme}) => theme.blueInvert};
    opacity: 0.85;
  }
`;

const Top = styled('div')`
  ${transition}
  font-size: small;
  padding-left: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({theme}) => theme.blueInvert};
  & > a {
    ${transition}
    color: ${({theme}) => theme.green};
  }
  & > a:hover {
    color: ${colors.green[1]};
  }
`;

const Header = styled('div')`
`;

const UserAddrLink = styled(Link)`
  ${transition}
  font-weight: bold;
  font-family: monospace;
  color: ${colors.blue[1]};
  &:hover {
    color: ${colors.blue[2]};
  }
`;

const Time = styled('span')`
  ${transition}
  font-size: small;
  color: ${({theme}) => theme.blueInvert}
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
  white-space: pre-line;
`;

const FullScreenPicture = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.75);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 999;
  cursor: pointer;
`;

export {
  Box,
  Top,
  Header,
  SubHeader,
  Txid,
  UserAddrLink,
  Time,
  Content,
  FullScreenPicture
};