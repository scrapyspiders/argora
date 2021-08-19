import {useParams, Link} from 'react-router-dom';
import {colors, C_replyToRootName, decodeData} from '../../constants';
import {PathParams, PostComponent} from '../../types';
import PostPicture from './Picture';
import {AvatarS} from '../../style/components/material-ui';
import {
  Top,
  Header,
  SubHeader,
  Txid,
  UserAddrLink,
  Time,
  Content,
  FadingContent
} from '../../style/components/BoxPost';
import {Main, LeftSide, RightSide} from '../../style/components/BoxCommon';
import {Box} from '../../style/components/BoxPost';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {CirclesToRhombusesSpinner} from 'react-epic-spinners';

dayjs.extend(relativeTime);

function Post({type, id, data, owner, time, replyTo, planet}: PostComponent) {
  const {pathBase} = useParams<PathParams>();

  const {content, picture} = decodeData(data);

  const isComment = type === "comment" ? {maxWidth: '550px', marginTop: '-10px'} : {};
  const isMining = time ? {} : {borderColor: colors.yellow};

  const styleFontSize = content.length < 200 ? {fontSize: 'larger'} : {fontSize: 'medium'};
  const styleMaxHeight = type !== "original" && content.length > 400 ? {maxHeight: '200px'} : {};

  return(
    <Box style={{...isComment, ...isMining}}>
      {planet && <Top>
        Planet <Link to={`/${pathBase}/${planet}`}>
          {planet}
        </Link>
      </Top>}
      {replyTo && replyTo !== C_replyToRootName && <Top>
        Replied to <Link to={`/${pathBase}/thread/${replyTo}`}>
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
          {picture && <PostPicture txid={picture} />}
          <Content style={{...styleFontSize, ...styleMaxHeight}}>
            {content}
            {type !== "original" && content.length > 400 && <FadingContent />}
          </Content>
        </RightSide>
      </Main>
    </Box>
  );
}

export default Post;