import {AvatarSprofile} from '../../style/components/material-ui';
import {UserAddr} from '../../style/components/BoxPost';
import {Box} from '../../style/components/BoxProfile';

function ProfileInfo ({owner}: {owner: string}) {
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