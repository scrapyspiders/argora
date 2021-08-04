import {useEffect, useState, useCallback} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../style/components/material-ui';
import {PostData, PathParams, unionPostsById} from '../constants';
import {ardb} from '../api/arweave';
import {arweave} from '../api/arweave';
import Post from './ui/Post';
import {VertLine} from '../style/components/decoration';
import ReplyForm from './forms/ReplyForm';
import Loading from './ui/Loading';

function Replies({txid}: {txid: string}) {
  const {pathBase} = useParams<PathParams>();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState<(PostData)[]>();

  const requestLastReplies = useCallback(async () => {
    console.log("requestLastReplies function");
    try {
      const queryResult = await ardb.search('transactions')
        .tag('App-Name', 'argora')
        .tag('App-Version', '0.0.1')
        .tag('reply-to', txid)
        .limit(30).find()

      const contents = queryResult.map(tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));
      
      Promise.all(contents).then(results => {
        const lastReplies = queryResult.map((tx, i) => {
          return {
            id: tx.id,
            content: results[i],
            owner: 'owner' in tx ? tx.owner.address : undefined,
            time: 'block' in tx ? tx.block?.timestamp : undefined
          }
        });
        setReplies(p => unionPostsById(p, lastReplies));
        setLoading(false);
      });
    } catch (e) {
      setError(`Could not retrieve toot: ${e}`);
    }
  }, [txid]);

  useEffect(() => {
    requestLastReplies();
    const interval = setInterval(requestLastReplies, 4000);
    return () => {
      clearInterval(interval);
      setReplies([]);
    };
  }, [requestLastReplies, setReplies]);

  return(
    <>
      <ReplyForm to={txid}
        submitted={(post: PostData) => setReplies(p => unionPostsById(p, [post]))} 
      />
      {!error && loading && <Loading />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {replies?.map((post, i) => (
        <div key={i}>
          <VertLine />
          {post.time
          ? <Link to={`/${pathBase}/${post.id}`}>
              <Post
                comment
                id={post.id}
                content={post.content}
                owner={post.owner}
                time={post.time}
              />
            </Link>
          : <Post
              comment
              id={post.id}
              content={post.content}
              owner={post.owner}
              time={post.time}
            />
          }
        </div>
      ))}
    </>
  );
}

export default Replies;