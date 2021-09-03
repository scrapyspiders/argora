import {useParams} from 'react-router-dom';
import {PathParams, T_userVertoID} from '../../types';
import Info from './info';
import Timeline from '../Timeline';
import { useContext, useEffect, useState } from 'react';
import { ctx, getVertoID } from '../../utils';

function Profile() {
  const {addr} = useParams<PathParams>();
  const {vertoUsersLocalStorage} = useContext(ctx);
  const [vertoID, setVertoID] = useState<T_userVertoID | null>(null);

  useEffect(() => {
    console.log("Profile useEffect");
    if(vertoUsersLocalStorage)
      setVertoID(() => getVertoID(addr));
  }, [vertoUsersLocalStorage, addr]);

  return(
    <>
      <Info addr={addr} vertoID={vertoID} />
      <h3 style={{textAlign: 'center'}}>Weeves and replies</h3>
      <Timeline type="profile" txid={addr} />
    </>
  );
}

export default Profile;