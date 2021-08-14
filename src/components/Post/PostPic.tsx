import {useState} from 'react';
import {Picture} from '../../style/components/BoxCommon';
import {FullScreenPicture} from '../../style/components/BoxPost';

function PostPic({txid}: {txid: string}) {
  const [fullscreen, setFullscreen] = useState(false);

  return(
    <div onClick={() => setFullscreen(!fullscreen)}>
      <Picture style={{
        backgroundImage: `url("https://arweave.net/${txid}")`,
        cursor: 'pointer'
      }} />
      {fullscreen && <FullScreenPicture style={{
        backgroundImage: `url("https://arweave.net/${txid}")`
      }} />}
    </div>
  )
}

export default PostPic;