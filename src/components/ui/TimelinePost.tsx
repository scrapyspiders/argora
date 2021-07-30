import {PostData} from '../../constants/types';
import {CardHeader, CardContent, Avatar} from '@material-ui/core';
import {CardPostS} from '../../style/components';

function TimelinePost({id, content, owner, time}: PostData) {

  return(
    <CardPostS>
      <CardHeader 
        avatar={<Avatar>{owner.slice(0,2)}</Avatar>}
        title={`@${owner.slice(0,5)}...${owner.slice(owner.length-5, owner.length)} - ${time}`}
        subheader={`txid: ${id}`}
      />
      <CardContent>
        {content}
      </CardContent>
    </CardPostS>
  );
}

export default TimelinePost;