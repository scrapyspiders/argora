import {useParams} from 'react-router-dom';
import {PathParams} from '../../types';
import Info from './info';
import Timeline from '../Timeline';

function Profile() {
  const {addr} = useParams<PathParams>();

  return(
    <>
      <Info owner={addr} />
      <h3 style={{textAlign: 'center'}}>Toots and replies</h3>
      <Timeline type="profile" txid={addr} />
    </>
  );
}

export default Profile;