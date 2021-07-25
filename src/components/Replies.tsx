import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import PostData from '../types/PostData';
import {run} from "ar-gql";
import {repliesGql} from '../api/queries';
import arweave from '../api/arweave';
import Comment from './ui/Comment';
import ThreadParams from '../types/ThreadParams';

function Replies({txid}: {txid: string}) {
  const {pathBase} = useParams<ThreadParams>();

  const [replies, setReplies] = useState<(PostData)[]>();

  useEffect(() => {
    (async () => {
      try {
        const queryResult = await run(repliesGql(txid));
        const txs = queryResult.data.transactions.edges;
        const contents = txs.map(async tx => arweave.transactions.getData(tx.node.id, {decode: true, string: true}));
        Promise.all(contents).then(results => {
          const replies = txs.map((tx, i) => {
            return {
              id: tx.node.id,
              content: results[i],
              owner: tx.node.owner.address,
              time: tx.node.block?.timestamp
            }
          });
          console.log(replies);
          setReplies(replies);
        });
      } catch {
        alert("Could not retrieve toot");
      }
    })();
  }, [txid]);

  return(
    <>
      {replies?.map((post, i) => (
        <Link to={`/${pathBase}/${post.id}`} key={i}>
          <Comment
            id={post.id}
            content={post.content}
            owner={post.owner}
            time={post.time}
          />
        </Link>
      ))}
    </>
  );
}

export default Replies;