import styled from 'styled-components';

const VertLine = styled('div')`
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
  border-bottom: 1px solid ${({theme}) => theme.blueInvert};
  margin-bottom: 10px;
`;

export {VertLine, Hr};