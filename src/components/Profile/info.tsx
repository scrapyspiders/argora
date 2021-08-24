import {AvatarSprofile} from '../../style/components/material-ui';
import {Box,UserAddr} from '../../style/components/BoxProfile';
import {T_userVertoID, T_walletAddr} from '../../types';

function ProfileInfo ({addr, vertoID}: {addr: T_walletAddr, vertoID: T_userVertoID | null}) {
  return(
    <Box>
      <AvatarSprofile style={{width: '100px', height: '100px', display: 'inline-flex'}}>
        {vertoID ? vertoID.username.slice(0,2) : addr.slice(0,2)}
      </AvatarSprofile>
      <div>
        <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
          {vertoID ? vertoID.username : addr.slice(0,2)}
        </UserAddr>
      </div>
    </Box>
  );
}

export default ProfileInfo;