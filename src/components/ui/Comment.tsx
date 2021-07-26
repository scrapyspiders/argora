import {PostData} from '../../constants/types';
import {Card, CardHeader, CardContent, Avatar} from '@material-ui/core';

function Comment({id, content, owner, time}: PostData) {

  return(
    <Card style={{marginTop: '10px'}}>
      <CardHeader 
        avatar={<Avatar>{owner.slice(0,3)}</Avatar>}
        title={`@${owner.slice(0,5)}...${owner.slice(owner.length-5, owner.length)} - ${time}`}
        subheader={<><span>txid: </span><span>{id}</span></>}
      />
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

export default Comment;