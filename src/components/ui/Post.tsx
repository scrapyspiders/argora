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

function TimelinePost({id, content, owner, time, comment}: PostData) {
  return(
    <Post style={comment ? {maxWidth: '550px', marginTop: '-10px'} : {}}>
      <LeftSide>
        <Avatar>{owner.slice(0,2)}</Avatar>
      </LeftSide>
      <RightSide>
        <Header>
          <UserAddr href={`https://viewblock.io/arweave/address/${owner}`} target="_blank" rel="noreferrer">
            @{owner.slice(0,5)}...{owner.slice(owner.length-5, owner.length)}
          </UserAddr>
          <Time> - {time}</Time>
        </Header>
        <SubHeader>
          txid: 
          <Txid href={`https://viewblock.io/arweave/tx/${id}`} target="_blank" rel="noreferrer">
              {id.slice(0,5)}...{id.slice(id.length-5, id.length)}
          </Txid>
        </SubHeader>
        <Content>{content}</Content>
      </RightSide>
    </Post>
  );
}

export default TimelinePost;