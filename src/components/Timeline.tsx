import {useEffect, useState} from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {run} from "ar-gql";
import PostData from '../types/PostData';
import arweave from '../api/arweave';
import {timelineGql} from '../api/queries';
import Post from './ui/TimelinePost';
import TimelineForm from './forms/TimelineForm';

function Timeline() {
  const [posts, setPosts] = useState<(PostData)[]>();

  useEffect(() => {
    (async () => {
      try {
        const queryResult = await run(timelineGql);
        const txs = queryResult.data.transactions.edges;
        const contents = txs.map(async tx => arweave.transactions.getData(tx.node.id, {decode: true, string: true}));
        Promise.all(contents).then(results => {
          const posts = txs.map((tx, i) => {
            return {
              id: tx.node.id,
              content: results[i],
              owner: tx.node.owner.address,
              time: tx.node.block?.timestamp
            }
          });
          console.log(posts);
          setPosts(posts);
        });
      } catch {
        alert("Error: Could not retrieve toots");
      }
    })();
  }, []);

  const match = useRouteMatch();

  return(
    <>
      <TimelineForm />
      {posts?.map((post, i) => (
        <Link to={`${match.url}/${post.id}`} key={i}>
          <Post 
            id={post.id}
            content={post.content}
            owner={post.owner}
            time={post.time}
          ></Post>
        </Link>
      ))}
    </>
  );
}

export default Timeline;