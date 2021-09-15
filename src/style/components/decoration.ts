import styled from 'styled-components';
import {transition} from '../../constants/colors';

const VertLine = styled('div')`
  ${transition}
  &:after {
    content:"";
    position: relative;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 50%;
    border-left: 1px solid ${({theme}) => theme.blueInvert};
    box-shadow: 0px 0px 10px 1px ${({theme}) => theme.blueInvert};
    transform: translate(-50%);
  }
`;

const Hr = styled('div')`
  ${transition}
  border-bottom: 1px solid ${({theme}) => theme.blueInvert};
  margin-bottom: 10px;
`;

const NoPostImgS = styled('img')`
  width: 300px;
  display: block;
  margin: auto;
  margin-top: 40px;
`;

export {VertLine, Hr, NoPostImgS};