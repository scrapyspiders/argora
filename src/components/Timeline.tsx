import {useEffect, useState, useCallback} from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {PostData} from '../constants/types';
import {arweave, ardb} from '../api/arweave';
import Post from './ui/Post';
import TimelineForm from './forms/TimelineForm';
import {unionPostsById} from '../constants/toolkit';

function Timeline() {
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      const queryResult = await ardb.search('transactions')
        .tag('App-Name', 'argora')
        .tag('App-Version', '0.0.1')
        .tag('reply-to', 'world')
        .limit(30).find();
      const contents = queryResult.map(async tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));
      Promise.all(contents).then(async results => {
        const lastPosts = queryResult.map((tx, i) => {
          return {
            id: tx.id,
            content: results[i],
            owner: 'owner' in tx ? tx.owner.address : undefined,
            time: 'block' in tx ? tx.block?.timestamp : undefined
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
    const interval = setInterval(requestLastPosts, 4000);
    return () => clearInterval(interval);
  }, [requestLastPosts]);

  const match = useRouteMatch();

  return(
    <>
      <TimelineForm submitted={(post: PostData) => setPosts(p => unionPostsById(p, [post]))} />
      {posts?.map((post, i) => (<div key={i}>
        {post.time
        ? <Link to={`${match.url}/${post.id}`}>
            <Post 
              id={post.id}
              content={post.content}
              owner={post.owner}
              time={post.time}
            />
          </Link>
        : <Post
            id={post.id}
            content={post.content}
            owner={post.owner}
            time={post.time}
          />
        }
      </div>))}
    </>
  );
}

export default Timeline;