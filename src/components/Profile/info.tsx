import { useContext } from 'react';

import { img, links } from '../../constants';
import { T_userVertoID, T_walletAddr } from '../../types';
import { ctx } from '../../utils';

import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';

import {
  AvatarS,
  Bio,
  BoxVertoID,
  Name,
  UserAddr,
  UserSocial,
  VertoIDinfo,
  VertoIDlogo
} from '../../style/components/BoxProfile';


import Anonymous from './Anonymous';

function ProfileInfo ({addr, vertoID}: {addr: T_walletAddr, vertoID: T_userVertoID | null}) {
  const {theme} = useContext(ctx);

  return(vertoID
    ? <BoxVertoID>
        {vertoID.image 
        ? <AvatarS src={`https://arweave.net/${vertoID.image}`} />
        : <AvatarS>{vertoID.username.slice(0,2)}</AvatarS>}
        <VertoIDinfo>
          <VertoIDlogo href={`${links.verto}/@${vertoID.username}`} target="_blank" rel="noreferrer">
            {theme 
              ? <img src={img.vertoLight} alt="Verto" />
              : <img src={img.vertoDark} alt="Verto" />
            }
            {' '}Verto ID
          </VertoIDlogo>
          <Name>{vertoID.name}</Name>
          <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
            {'@' + vertoID.username}
          </UserAddr>
          {vertoID.addresses.length > 1 &&
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {vertoID.addresses.map(address => 
                <UserAddr href={`https://viewblock.io/arweave/address/${address}`} target="_blank" rel="noreferrer">
                  {address !== addr && <li>{address.slice(0,5)}...{address.slice(address.length-5, address.length)}</li>}
                </UserAddr>
              )}
            </ul>
          }
          <Bio>{vertoID.bio}</Bio>
          {vertoID.links.twitter && 
          <UserSocial href={`https://twitter.com/${vertoID.links.twitter}`} target="_blank" rel="noreferrer">
            <TwitterIcon fontSize="medium" />
          </UserSocial>}
          {vertoID.links.instagram && <UserSocial href={`https://instagram.com/${vertoID.links.instagram}`} target="_blank" rel="noreferrer">
            <InstagramIcon fontSize="medium" />
          </UserSocial>}
          {vertoID.links.github && <UserSocial href={`https://github.com/${vertoID.links.github}`} target="_blank" rel="noreferrer">
            <GitHubIcon fontSize="medium" />
          </UserSocial>}
          {vertoID.links.facebook && <UserSocial href={`https://facebook.com/${vertoID.links.facebook}`} target="_blank" rel="noreferrer">
            <FacebookIcon fontSize="medium" />
          </UserSocial>}
        </VertoIDinfo>
      </BoxVertoID>
    : <Anonymous addr={addr} />
  );
}

export default ProfileInfo;