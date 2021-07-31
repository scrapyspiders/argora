import {useEffect, useState, useCallback} from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {run} from "ar-gql";
import {PostData} from '../constants/types';
import arweave from '../api/arweave';
import {timelineGql} from '../api/queries';
import Post from './ui/Post';
import TimelineForm from './forms/TimelineForm';
import {unionPostsById} from '../constants/toolkit';

function Timeline() {
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      const queryResult = await run(timelineGql);
      const txs = queryResult.data.transactions.edges;
      const contents = txs.map(async tx => arweave.transactions.getData(tx.node.id, {decode: true, string: true}));
      Promise.all(contents).then(async results => {
        const lastPosts = txs.map((tx, i) => {
          return {
            id: tx.node.id,
            content: results[i],
            owner: tx.node.owner.address,
            time: tx.node.block?.timestamp
          }
        });
        setPosts(p => unionPostsById(p, lastPosts));
      });
    } catch {
      alert("Error: Could not retrieve toots");
    }
  }, []);

  useEffect(() => {
    requestLastPosts();
    const interval = setInterval(requestLastPosts, 5000);
    return () => clearInterval(interval);
  }, [requestLastPosts]);

  const match = useRouteMatch();

  return(
    <>
      <TimelineForm submitted={(post: PostData) => setPosts(p => unionPostsById(p, [post]))} />
      {posts?.map((post, i) => (
        <Link to={`${match.url}/${post.id}`} key={i}>
          <Post 
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

export default Timeline;