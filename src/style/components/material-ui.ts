import {Button, IconButton, Card, TextareaAutosize, Avatar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import styled from 'styled-components';
import {colors, transition} from '../../constants';

const ButtonS = styled(Button)`
  ${transition}
  color: ${colors.purple[0]};
  &:hover {
    color: ${colors.purple[2]};
  }
`;

const IconButtonS = styled(IconButton)`
  ${transition}
  color: ${({ theme }) => theme.text};
`;

const CardPostS = styled(Card)`
  ${transition}
  margin-top: 10px;
  border: 1px solid ${colors.purple[0]};
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
`;

const TextareaAutosizeS = styled(TextareaAutosize)`
  ${transition}
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
  width: 100%;
  padding: 20px 0px 20px 0px;
  resize: none;
  font-family: Arial;
  border: 0;
  &:focus {
    outline: none;
  }
`;

const AlertS = styled(Alert)`
  margin: auto;
  max-width: 600px;
`;

const AvatarS = styled(Avatar)`
  ${transition}
  // background-color: ${({ theme }) => theme.blueInvert};
  background-color: rgba(0,0,0,0);
  border: 1px solid ${({ theme }) => theme.blueInvert};
  color: ${({ theme }) => theme.blue};
`;

export {
  ButtonS,
  IconButtonS,
  CardPostS,
  TextareaAutosizeS,
  AlertS,
  AvatarS,
};