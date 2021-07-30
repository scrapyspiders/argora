import {PostData} from '../../constants/types';
import {Avatar} from '@material-ui/core';
import {
  Post,
  LeftSide,
  RightSide,
  Header,
  SubHeader,
  Txid,
  UserAddr,
  Time,
  Content
} from '../../style/components/post';

function TimelinePost({id, content, owner, time}: PostData) {

  return(
    <Post>
      <LeftSide>
        <Avatar>{owner.slice(0,2)}</Avatar>
      </LeftSide>
      <RightSide>
        <Header>
          <UserAddr>
            @{owner.slice(0,5)}...{owner.slice(owner.length-5, owner.length)}
          </UserAddr>
          <Time> - {time}</Time>
        </Header>
        <SubHeader>txid: <Txid>{id.slice(0,5)}...{id.slice(id.length-5, id.length)}</Txid></SubHeader>
        <Content>{content}</Content>
      </RightSide>
    </Post>
  );
}

export default TimelinePost;