import styled from 'styled-components';

const Main = styled('div')`
  display: flex;
`;

const LeftSide = styled('div')`
  padding: 10px 20px 0px 20px;
`;

const RightSide = styled('div')`
  flex: 1;
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

export {Main, LeftSide, RightSide, Picture};