import {useParams, Link} from 'react-router-dom';
import {colors} from '../../constants';
import {PathParams, PostComponent, T_userVertoID} from '../../types';
import PostPicture from './Picture';
import {AvatarS, ButtonS} from '../../style/components/material-ui';
import {
  Header,
  SubHeader,
  Txid,
  Time,
  Content,
  FadingContent
} from '../../style/components/BoxPost';
import {Main, LeftSide, RightSide} from '../../style/components/BoxCommon';
import {Box} from '../../style/components/BoxPost';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {CirclesToRhombusesSpinner} from 'react-epic-spinners';
import Top from './Top';
import { useContext, useEffect, useState } from 'react';
import { ctx, decodeData, getVertoID } from '../../utils';
import Username from './Username';
import { unlockPost } from '../../api/arweave';

dayjs.extend(relativeTime);

function Post({type, id, data, owner, time, replyTo, planet}: PostComponent) {
  const {pathBase} = useParams<PathParams>();
  const {vertoUsersLocalStorage, walletAddr} = useContext(ctx);

  const {content, picture} = decodeData(data);
  
  const [vertoID, setVertoID] = useState<T_userVertoID | null>(null);

  useEffect(() => {
    // console.log("Post useEffect");
    if(vertoUsersLocalStorage)
      setVertoID(() => getVertoID(owner));
  }, [vertoUsersLocalStorage, owner]);

  const isComment = type === "comment" ? {maxWidth: '550px', marginTop: '-10px'} : {};
  const isMining = time ? {} : {borderColor: colors.yellow};

  const styleFontSize = content.length < 200 ? {fontSize: 'larger'} : {fontSize: 'medium'};
  const styleMaxHeight = type !== "original" && content.length > 400 ? {maxHeight: '200px'} : {};

  const mint = async () => {
    await unlockPost(walletAddr, id);
  }

  return(
    <Box style={{...isComment, ...isMining}}>
      <Top replyTo={replyTo} planet={planet} />
      <Main>
        <LeftSide>
          <Link to={`/${pathBase}/profile/${owner}`}>
            {vertoID && vertoID.image 
            ? <AvatarS src={`https://arweave.net/${vertoID.image}`} />
            : <AvatarS>
                {vertoID ? vertoID.username.slice(0,2) : owner?.slice(0,2)}
              </AvatarS>}
          </Link>
          <ButtonS onClick={mint}>
            Unlock
          </ButtonS>
        </LeftSide>
        <RightSide>
          <Header>
            {owner && <Username addr={owner} vertoID={vertoID} />}
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