import {useParams, Link} from 'react-router-dom';
import {PostData, PathParams, colors, decodeData} from '../../constants';
import {AvatarS} from '../../style/components/material-ui';
import {
  Top,
  Header,
  SubHeader,
  Txid,
  UserAddrLink,
  Time,
  Content
} from '../../style/components/BoxPost';
import {Main, LeftSide, RightSide} from '../../style/components/BoxCommon';
import {Box} from '../../style/components/BoxPost';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {CirclesToRhombusesSpinner} from 'react-epic-spinners';

dayjs.extend(relativeTime);

function TimelinePost({id, data, owner, time, replyTo, comment}: PostData) {
  const {pathBase} = useParams<PathParams>();

  const isComment = comment ? {maxWidth: '550px', marginTop: '-10px'} : {};
  const isMining = time ? {} : {borderColor: colors.yellow};

  const {content, picture} = decodeData(data);
  
  return(
    <Box style={{...isComment, ...isMining}}>
      {replyTo && <Top>
        Replied to <Link to={`/${pathBase}/${replyTo}`}>
          {replyTo.slice(0,10)}...{replyTo.slice(replyTo.length-10, replyTo.length)}
        </Link>
      </Top>}
      <Main>
        <LeftSide>
          <Link to={`/${pathBase}/profile/${owner}`}>
            <AvatarS>{owner?.slice(0,2)}</AvatarS>
          </Link>
        </LeftSide>
        <RightSide>
          <Header>
            <UserAddrLink to={`/${pathBase}/profile/${owner}`}>
              @{owner?.slice(0,5)}...{owner?.slice(owner?.length-5, owner?.length)}
            </UserAddrLink>
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
          <Content>
            {content}
            {picture && <img src={`https://arweave.net/${picture}`} style={{width: '400px'}} />}
          </Content>
        </RightSide>
      </Main>
    </Box>
  );
}

export default TimelinePost;