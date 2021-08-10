import styled from 'styled-components';
import {colors, transition} from '../../constants/colors';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

/*
 *  Box is a copy of Box from BoxPost with few differences (colors).
 */
const Box = styled('div')`
  ${transition}
  background-color: ${({theme}) => theme.postBackground};
  color: ${({theme}) => theme.text};
  border: 1px solid ${colors.blue[1]};
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  padding: 10px 10px 10px 0px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
  box-sizing: initial;

  &:hover {
    transition: border-color 0s;
    border-color: ${({theme}) => theme.greenInvert};
  }
`;

const Picture = styled('div')`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const PictureCloseButton = styled(HighlightOffIcon)`
  background-color: ${({theme}) => theme.postBackground};
  border-radius: 100%;
  cursor: pointer;
  margin: 10px;
`;

export {Box, Picture, PictureCloseButton}