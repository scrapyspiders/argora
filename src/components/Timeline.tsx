import {useEffect, useState, useCallback} from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {AlertS} from '../style/components/material-ui';
import {appVersionTag, PostData, unionPostsById} from '../constants';
import {arweave, ardb} from '../api/arweave';
import Post from './Post';
import Form from './Form';
import Loading from './ui/Loading';

function Timeline() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      const queryResult = await ardb.search('transactions')
        .tag('App-Name', 'argora')
        .tag('App-Version', appVersionTag)
        .tag('reply-to', 'world')
        .limit(30).find();
      const contents = queryResult.map(tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));
      Promise.all(contents).then(async results => {
        const lastPosts = queryResult.map((tx, i) => {
          return {
            id: tx.id,
            data: results[i],
            owner: 'owner' in tx ? tx.owner.address : undefined,
            time: 'block' in tx ? tx.block?.timestamp : undefined
          }
        });
        setPosts(p => unionPostsById(p, lastPosts));
        setLoading(false);
      });
    } catch(e) {
      setError(`Could not retrieve toot: ${e}`);
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
      <Form 
        submitted={(post: PostData) => setPosts(p => unionPostsById(p, [post]))}
        to="world"
      />
      {!error && loading && <Loading />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {posts?.map((post, i) => (<div key={i}>
        {post.time
        ? <Link to={`${match.url}/${post.id}`}>
            <Post 
              id={post.id}
              data={post.data}
              owner={post.owner}
              time={post.time}
            />
          </Link>
        : <Post
            id={post.id}
            data={post.data}
            owner={post.owner}
            time={post.time}
          />
        }
      </div>))}
    </>
  );
}

export default Timeline;