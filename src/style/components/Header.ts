import styled from 'styled-components';
import { transition } from '../../constants';

const FormS = styled('form')`
  // border: 1px solid red;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
`;

const InputS = styled('input')`
  border: 1px solid ${({theme}) => theme.greenInvert};
  width: 90%;
  ${transition}
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
  padding: 10px 15px 10px 20px;
  height: 47px;
  font-family: Arial;
  font-size: larger;
  border-radius: 30px 0px 0px 30px;
  &:focus {
    outline: none;
  }
`;

const ButtonS = styled('div')`
  // border: 1px solid blue;
  font-size: larger;
  background-color: ${({theme}) => theme.postBackground};
  padding-right: 20px;
  padding-left: 20px;
  height: 47px;
  border-radius: 0px 30px 30px 0px;
  cursor: pointer;
`;

export {FormS, InputS, ButtonS};