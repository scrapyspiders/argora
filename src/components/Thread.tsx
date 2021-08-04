import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Alert} from '@material-ui/lab';
import {arweave, ardb} from '../api/arweave';
import {PostData, PathParams} from '../constants/types';
import Post from './ui/Post';
import Replies from './Replies';
import {ButtonS} from '../style/components/material-ui';
import Loading from './ui/Loading';

function Thread() {
  const {pathBase, txid} = useParams<PathParams>();

  const [error, setError] = useState<string>();
  const [post, setPost] = useState<PostData>();

  useEffect(() => {
    (async () => {
      try {
        const tx = await ardb.search('transaction')
          .id(txid)
          .findOne();

        const content = await arweave.transactions.getData(tx.id, {decode: true, string: true});
        const replyTo = 'tags' in tx ? tx.tags.find(tag => tag.name === 'reply-to') : undefined;
        
        setPost({
          id: tx.id,
          content: content,
          owner: 'owner' in tx ? tx.owner.address : undefined,
          time: 'block' in tx ? tx.block?.timestamp : undefined,
          replyTo: replyTo?.value === 'world' ? undefined : replyTo?.value
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
      {!error && !post && <Loading />}
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