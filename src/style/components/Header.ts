import styled from 'styled-components';
import { colors, transition } from '../../constants';

const FormS = styled('form')`
  flex: 1;
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 1000px;
`;

const InputS = styled('input')`
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
  &:focus {
    outline: none;
  }
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

export {FormS, InputS, ButtonS};