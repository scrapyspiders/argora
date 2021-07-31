import {useEffect, useState, useCallback} from 'react';
import {useParams, Link} from 'react-router-dom';
import {PostData, PathParams} from '../constants/types';
import {run} from "ar-gql";
import {repliesGql} from '../api/queries';
import arweave from '../api/arweave';
import Post from './ui/Post';
import {VertLine} from '../style/components/decoration';
import {unionPostsById} from '../constants/toolkit';

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
    const interval = setInterval(requestLastReplies, 5000);
    return () => clearInterval(interval);
  }, [requestLastReplies]);

  return(
    <>
      {replies?.map((post, i) => (
        <>
          <VertLine />
          <Link to={`/${pathBase}/${post.id}`} key={i}>
            <Post
              comment
              id={post.id}
              content={post.content}
              owner={post.owner}
              time={post.time}
            />
          </Link>
        </>
      ))}
    </>
  );
}

export default Replies;