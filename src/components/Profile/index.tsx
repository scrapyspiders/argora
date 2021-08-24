import {useParams} from 'react-router-dom';
import {PathParams, T_userVertoID} from '../../types';
import Info from './info';
import Timeline from '../Timeline';
import { useEffect, useState } from 'react';
import { getVertoID } from '../../utils';

function Profile() {
  const {addr} = useParams<PathParams>();
  const [vertoID, setVertoID] = useState<T_userVertoID | null>(null);

  useEffect(() => {
    console.log("useEffect 1 time");
    setVertoID(() => getVertoID(addr));
  }, [addr]);

  return(
    <>
      <Info addr={addr} vertoID={vertoID} />
      <h3 style={{textAlign: 'center'}}>Weeves and replies</h3>
      <Timeline type="profile" txid={addr} />
    </>
  );
}

export default Profile;