import {useParams} from 'react-router-dom';
import {PathParams} from '../types';
import ProfileInfo from './ui/ProfileInfo';
import Timeline from './Timeline';

function Profile() {
  const {addr} = useParams<PathParams>();

  return(
    <>
      <ProfileInfo owner={addr} />
      <h3 style={{textAlign: 'center'}}>Toots and replies</h3>
      <Timeline txid={addr} type="profile" />
    </>
  );
}

export default Profile;