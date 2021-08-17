import {AvatarSprofile} from '../../style/components/material-ui';
import {Box,UserAddr} from '../../style/components/BoxProfile';
import {T_walletAddr} from '../../types';

function ProfileInfo ({owner}: {owner: T_walletAddr}) {
  return(
    <Box>
      <AvatarSprofile style={{width: '100px', height: '100px', display: 'inline-flex'}}>
        {owner?.slice(0,2)}
      </AvatarSprofile>
      <div>
        <UserAddr href={`https://viewblock.io/arweave/address/${owner}`} target="_blank" rel="noreferrer">
          {owner}
        </UserAddr>
      </div>
    </Box>
  );
}

export default ProfileInfo;