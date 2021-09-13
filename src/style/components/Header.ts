import { AppBar } from '@material-ui/core';
import styled from 'styled-components';
import { colors, transition } from '../../constants';

const AppBarS = styled(AppBar)`
  ${transition}
  background-color: ${({ theme }) => theme.bodyBackground};
  color: ${({ theme }) => theme.text};
  // box-shadow: 0px 2px 4px ${({ theme }) => theme.purpleInvert};
  border-bottom: 1px solid ${({ theme }) => theme.purpleInvert};
`;

const AppBarBottomS = styled(AppBarS)`
  ${transition}
  border-top: 1px solid ${({ theme }) => theme.purpleInvert};
  // box-shadow: 0px -2px 4px ${({ theme }) => theme.purpleInvert};
  top: auto;
  bottom: 0;
`;

const FormS = styled('form')`
  flex: 1;
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 1000px;

  @media only screen and (max-width: 724px){
    padding: 0;
  }
`;

const InputLeftS = styled('div')`
  ${transition}
  flex: 1;
  display: flex;
  border: 1px solid ${colors.purple[0]};
  border-right: 0;
  background-color: ${({theme}) => theme.postBackground};
  height: 47px;
  border-radius: 25px 0px 0px 25px;
  align-items: center;
  &:hover {
    border-color: ${({theme}) => theme.greenInvert};
  }
`;

const InputS = styled('input').attrs(props => ({
  className: props.className,
  spellCheck: false
}))`
  &.cropped {
    border-radius: 0px;
    border: 0;
    height: 45px;
    padding-left: 8px;
  }

  ${transition}
  border: 1px solid ${colors.purple[0]};
  border-right: 0;
  flex: 1;
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
  padding: 10px 15px 10px 20px;
  height: 47px;
  font-family: Arial;
  font-size: larger;
  border-radius: 25px 0px 0px 25px;
  &:hover {
    border-color: ${({theme}) => theme.greenInvert};
  }
  ${InputLeftS}:hover & {
    border-color: ${({theme}) => theme.greenInvert};
  }
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 724px){
    font-size: medium;
  }
`;

const InfoS = styled('div')`
  margin-left: 12px;
  padding: 3px;
  font-size: small;
  border-radius: 3px;
  border: 1px solid ${({theme}) => theme.blue};
  color: ${({theme}) => theme.blue};
`;

const ButtonS = styled('div')`
  ${transition}
  border: 1px solid ${colors.purple[0]};
  background-color: ${({theme}) => theme.postBackground};
  padding-right: 25px;
  padding-left: 20px;
  height: 47px;
  line-height: 47px;
  font-size: larger;
  border-radius: 0px 25px 25px 0px;
  cursor: pointer;
  vertical-align: middle;
  &:hover{
    border-color: ${colors.purple[2]};
    background-color: ${({theme}) => theme.purpleInvert}11;
  }
`;

export {AppBarS, AppBarBottomS, FormS, InputLeftS, InfoS, InputS, ButtonS};