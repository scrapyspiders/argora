import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Alert} from '@material-ui/lab';
import {run} from "ar-gql";
import arweave from '../api/arweave';
import {postGql} from '../api/queries';
import {PostData, PathParams} from '../constants/types';
import Post from './ui/Post';
import Replies from './Replies';
import {ButtonS} from '../style/components/material-ui';

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
      <Link to={`/${pathBase}`}><ButtonS>Back to timeline</ButtonS></Link>
      <br />
      {!error && !post && <>loading</>}
      {error && <Alert severity="error">{error}</Alert>}
      {post && 
        <>
          <Post
            id={post.id}
            content={post.content}
            owner={post.owner}
            time={post.time}
            replyTo={post.replyTo}
          />
          <Replies txid={post.id} />
        </>
      }
    </>
  );
}

export default Thread;