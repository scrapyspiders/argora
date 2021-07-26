import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Alert} from '@material-ui/lab';
import {run} from "ar-gql";
import arweave from '../api/arweave';
import {postGql} from '../api/queries';
import {PostData, PathParams} from '../constants/types';
import Post from './ui/ThreadPost';
import ReplyForm from './forms/ReplyForm';
import Replies from './Replies';

function Thread() {
  const {pathBase, txid} = useParams<PathParams>();

  const [error, setError] = useState<string>();
  const [post, setPost] = useState<PostData>();

  useEffect(() => {
    (async () => {
      try {
        const queryResult = await run(postGql(txid));
        const tx = queryResult.data.transaction;
        const content = await arweave.transactions.getData(tx.id, {decode: true, string: true});
        const txData = await arweave.transactions.get(tx.id);
        let replyTo = undefined;
        for(let i=0 ; i<txData.tags.length ; i++){
          if('reply-to' === txData.tags[i].get('name', {decode: true, string: true})){
            replyTo = txData.tags[i].get('value', {decode: true, string: true});
            if(replyTo === "world") replyTo = undefined;
            break;
          }
        }
        setPost({
          id: tx.id,
          content: content,
          owner: tx.owner.address,
          time: tx.block?.timestamp,
          replyTo: replyTo
        });
      } catch {
        setError("Could not retrieve toot");
      }
    })();
  }, [txid]);

  return(
    <>
      {!error && !post && <>loading</>}
      {error && <Alert severity="error">{error}</Alert>}
      {post && post.replyTo
        ? <Link to={`/${pathBase}/${post.replyTo}`}>Back to {post.replyTo}</Link>
        : <Link to={`/${pathBase}`}>Back to timeline</Link>
      }
      {post && 
        <>
          <Post
            id={post.id}
            content={post.content}
            owner={post.owner}
            time={post.time}
          />
          <ReplyForm to={post.id} />
          <Replies txid={post.id} />
        </>
      }
    </>
  );
}

export default Thread;