import {useEffect, useState, useCallback} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../style/components/material-ui';
import {PostData, PathParams, unionPostsById, appVersionTag} from '../constants';
import {arweave, ardb} from '../api/arweave';
import Post from './ui/Post';
import Loading from './ui/Loading';

function Profile() {
  const {pathBase, addr} = useParams<PathParams>();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      console.log(addr);
      const txs = await ardb.search('transactions')
        .tag('App-Name', 'argora')
        .tag('App-Version', appVersionTag)
        .from(addr)
        .limit(30).find();

      const contents = txs.map(tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));
      const replyToTags = txs.map(tx => 'tags' in tx ? tx.tags.find(tag => tag.name === 'reply-to') : undefined);

      Promise.all(contents).then(async results => {
        const lastPosts = txs.map((tx, i) => {
          return {
            id: tx.id,
            content: results[i],
            owner: 'owner' in tx ? tx.owner.address : undefined,
            time: 'block' in tx ? tx.block?.timestamp : undefined,
            replyTo: replyToTags[i]?.value === 'world' ? undefined : replyToTags[i]?.value
          }
        });
        setPosts(p => unionPostsById(p, lastPosts));
        setLoading(false);
      });
    } catch (e) {
      setError(`Could not retrieve toots: ${e}`);
    }
  }, [addr]);

  useEffect(() => {
    requestLastPosts();
    const interval = setInterval(requestLastPosts, 10000);
    return () => clearInterval(interval);
  }, [requestLastPosts]);

  return(
    <>
      {!error && loading && <Loading />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {posts?.map((post, i) => (<div key={i}>
        {post.time
        ? <Link to={`/${pathBase}/${post.id}`}>
            <Post 
              id={post.id}
              content={post.content}
              owner={post.owner}
              time={post.time}
              replyTo={post.replyTo}
            />
          </Link>
        : <Post
            id={post.id}
            content={post.content}
            owner={post.owner}
            time={post.time}
            replyTo={post.replyTo}
          />
        }
      </div>))}
    </>
  );
}

export default Profile;