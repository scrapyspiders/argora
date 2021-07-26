import {PostData} from '../../constants/types';
import {Card, CardHeader, CardContent, Avatar} from '@material-ui/core';

function ThreadPost({id, content, owner, time}: PostData) {

  return(
    <Card style={{marginTop: '10px'}}>
      <CardHeader 
        avatar={<Avatar>{owner.slice(0,3)}</Avatar>}
        title={`@${owner.slice(0,5)}...${owner.slice(owner.length-5, owner.length)} - ${time}`}
        subheader={<>
          <span>txid: </span><a 
            target="_blank"
            rel="noreferrer"
            href={`https://viewblock.io/arweave/tx/${id}`}>
              {id.slice(0,5)}...{id.slice(id.length-5, id.length)}
            </a>
        </>}
      />
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

export default ThreadPost;