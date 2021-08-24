import {AvatarSprofile} from '../../style/components/material-ui';
import {Box,UserAddr} from '../../style/components/BoxProfile';
import {T_userVertoID, T_walletAddr} from '../../types';

function ProfileInfo ({addr, vertoID}: {addr: T_walletAddr, vertoID: T_userVertoID | null}) {
  return(
    <Box>
      {vertoID && vertoID.image 
      ? <AvatarSprofile src={`https://arweave.net/${vertoID.image}`} />
      : <AvatarSprofile>
          {vertoID ? vertoID.username.slice(0,2) : addr.slice(0,2)}
        </AvatarSprofile>}
      <div>
        <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
          {vertoID ? '@' + vertoID.username : addr}
        </UserAddr>
      </div>
      {vertoID && <ul>
        <li>name: {vertoID.name}</li>
        <li>bio: {vertoID.bio}</li>
        <li>twitter: {vertoID.links.twitter}</li>
        <li>github: {vertoID.links.github}</li>
        <li>instagram: {vertoID.links.instagram}</li>
        <li>addresses: {vertoID.addresses}</li>
      </ul>}
    </Box>
  );
}

export default ProfileInfo;