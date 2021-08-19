import {useState} from 'react';
import {PictureS} from '../../style/components/BoxCommon';
import {FullScreenPicture} from '../../style/components/BoxPost';
import {T_txid} from '../../types';

function Picture({txid}: {txid: T_txid}) {
  const [fullscreen, setFullscreen] = useState(false);

  return(
    <div onClick={() => setFullscreen(!fullscreen)}>
      <PictureS style={{
        backgroundImage: `url("https://arweave.net/${txid}")`,
        cursor: 'pointer'
      }} />
      {fullscreen && <FullScreenPicture style={{
        backgroundImage: `url("https://arweave.net/${txid}")`
      }} />}
    </div>
  )
}

export default Picture;