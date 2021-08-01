import {useEffect, useState, useCallback} from 'react';
import {useParams, Link} from 'react-router-dom';
import {PostData, PathParams} from '../constants/types';
import {run} from "ar-gql";
import {repliesGql} from '../api/queries';
import arweave from '../api/arweave';
import Post from './ui/Post';
import {VertLine} from '../style/components/decoration';
import {unionPostsById} from '../constants/toolkit';
import ReplyForm from './forms/ReplyForm';

function Replies({txid}: {txid: string}) {
  const {pathBase} = useParams<PathParams>();

  const [replies, setReplies] = useState<(PostData)[]>();

  const requestLastReplies = useCallback(async () => {
    console.log("requestLastReplies function");
    try {
      const queryResult = await run(repliesGql(txid));
      const txs = queryResult.data.transactions.edges;
      const contents = txs.map(async tx => arweave.transactions.getData(tx.node.id, {decode: true, string: true}));
      Promise.all(contents).then(results => {
        const lastReplies = txs.map((tx, i) => {
          return {
            id: tx.node.id,
            content: results[i],
            owner: tx.node.owner.address,
            time: tx.node.block?.timestamp
          }
        });
        setReplies(p => unionPostsById(p, lastReplies));
      });
    } catch {
      alert("Could not retrieve toot");
    }
  }, [txid]);

  useEffect(() => {
    setReplies([]);
    requestLastReplies();
    const interval = setInterval(requestLastReplies, 4000);
    return () => clearInterval(interval);
  }, [requestLastReplies]);

  return(
    <>
      <ReplyForm to={txid}
        submitted={(post: PostData) => setReplies(p => unionPostsById(p, [post]))} 
      />
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