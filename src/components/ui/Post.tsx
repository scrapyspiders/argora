import {useParams, Link} from 'react-router-dom';
import {PostData, PathParams} from '../../constants/types';
import {Avatar} from '@material-ui/core';
import {
  Top,
  Header,
  SubHeader,
  Txid,
  UserAddr,
  Time,
  Content
} from '../../style/components/BoxPost';
import {Main, LeftSide, RightSide} from '../../style/components/BoxCommon';
import {Box} from '../../style/components/BoxPost';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {CirclesToRhombusesSpinner} from 'react-epic-spinners';
import {colors} from '../../constants/colors';

dayjs.extend(relativeTime);

function TimelinePost({id, content, owner, time, replyTo, comment}: PostData) {
  const {pathBase} = useParams<PathParams>();

  const isComment = comment ? {maxWidth: '550px', marginTop: '-10px'} : {};
  const isMining = time ? {} : {borderColor: colors.yellow};
  
  return(
    <Box style={{...isComment, ...isMining}}>
      {replyTo && <Top>
        Replied to <Link to={`/${pathBase}/${replyTo}`}>
          {replyTo.slice(0,10)}...{replyTo.slice(replyTo.length-10, replyTo.length)}
        </Link>
      </Top>}
      <Main>
        <LeftSide>
          <Avatar>{owner?.slice(0,2)}</Avatar>
        </LeftSide>
        <RightSide>
          <Header>
            <UserAddr href={`https://viewblock.io/arweave/address/${owner}`} target="_blank" rel="noreferrer">
              @{owner?.slice(0,5)}...{owner?.slice(owner?.length-5, owner?.length)}
            </UserAddr>
            <Time> - {
              time ? dayjs().to(dayjs(new Date(time*1000)), true)
              : <>
                <CirclesToRhombusesSpinner size={10} color={colors.green[1]} style={{display: 'inline-flex'}} /> mining
              </>}
            </Time>
          </Header>
          <SubHeader>
            txid: 
            <Txid href={`https://viewblock.io/arweave/tx/${id}`} target="_blank" rel="noreferrer">
                {id.slice(0,5)}...{id.slice(id.length-5, id.length)}
            </Txid>
          </SubHeader>
          <Content>{content}</Content>
        </RightSide>
      </Main>
    </Box>
  );
}

export default TimelinePost;