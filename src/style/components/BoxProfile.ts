import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import {colors, transition} from '../../constants';

const AvatarS = styled(Avatar)`
  ${transition}
  display: inline-flex;
  width: 200px;
  height: 200px;
  font-size: xxx-large;
  background-color: ${({ theme }) => theme.blue};
  color: ${colors.yellow};
`;

const Box = styled('div')`
  ${transition}
  color: ${({theme}) => theme.text};
  padding: 10px 10px 10px 10px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
  box-sizing: initial;
`;

const BoxVertoID = styled(Box)`
  display: flex;
  align-items: center;

  & > ${AvatarS} {
    margin-right: 20px;
  }
`;

const BoxAnonymous = styled(Box)`
  text-align: center;
`;

const AvatarAnonymousS = styled(Avatar)`
  ${transition}
  display: inline-flex;
  width: 150px;
  height: 150px;
  font-size: xxx-large;
  background-color: ${({ theme }) => theme.blue};
  color: ${colors.yellow};
`;

const VertoIDinfo = styled('div')`
  flex: 1;
  overflow-wrap: anywhere;
`;

const VertoIDlogo = styled('a')`
  ${transition}
  padding: 5px;
  margin-top: -5px;
  margin-right: -5px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.purpleInvert};
  color: ${({ theme }) => theme.purpleInvert};
  float: right;
  font-size: medium;
  &:hover {
    color: ${({ theme }) => theme.purple};
    border: 1px solid ${({ theme }) => theme.purple};
  }
  & > img {
    display: inline-block;
    vertical-align: bottom;
    width: 24px;
  }
`;

const Name = styled('div')`
  color: ${({theme}) => theme.blue};
  font-size: xx-large;
  margin-bottom: -7px;
  font-weight: bold;
`;

const UserAddr = styled('a')`
  ${transition}
  font-family: monospace;
  color: ${colors.blue[1]};
  &:hover {
    color: ${colors.blue[2]};
  }
`;

const UserSocial = styled('a')`
  ${transition}
  font-family: monospace;
  color: ${({theme}) => theme.text};
  margin-right: 20px;
  &:hover {
    color: ${colors.blue[1]};
  }
`;

const Bio = styled('div')`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export {
  BoxVertoID,
  BoxAnonymous,
  AvatarS,
  AvatarAnonymousS,
  VertoIDinfo,
  VertoIDlogo,
  Name,
  UserAddr,
  UserSocial,
  Bio
};