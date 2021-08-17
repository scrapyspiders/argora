import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../style/components/material-ui';
import {arweave, ardb} from '../api/arweave';
import {PostData, PathParams} from '../types';
import Post from './Post';
import Timeline from './Timeline';
import {ButtonS} from '../style/components/material-ui';
import Loading from './ui/Loading';

function Thread() {
  const {pathBase, txid} = useParams<PathParams>();

  const [error, setError] = useState<string>();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const tx = await ardb.search('transactions')
          .ids([txid])
          .findOne();

        const data = await arweave.transactions.getData(tx.id, {decode: true, string: true});
        const replyTo = 'tags' in tx ? tx.tags.find(tag => tag.name === 'reply-to') : undefined;
        
        setPost({
          id: tx.id,
          data: data,
          owner: 'owner' in tx ? tx.owner.address : undefined,
          time: 'block' in tx ? tx.block?.timestamp : undefined,
          replyTo: replyTo?.value === "world" ? undefined : replyTo?.value
        });
      } catch(e) {
        setError(`Could not retrieve toot: ${e}`);
      }
    })();
    return () => {
      setPost(null);
    }
  }, [txid, setPost]);

  return(
    <>
      <Link to={`/${pathBase}`}><ButtonS>Back to timeline</ButtonS></Link>
      <br />
      {!error && !post && <Loading type="timeline" />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {post && 
        <>
          <Post
            fullText
            id={post.id}
            data={post.data}
            owner={post.owner}
            time={post.time}
            replyTo={post.replyTo}
          />
          <Timeline txid={post.id} type="comments" />
        </>
      }
    </>
  );
}

export default Thread;