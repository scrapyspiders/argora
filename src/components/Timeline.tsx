import {useEffect, useState, useCallback} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../style/components/material-ui';
import {PostData, PathParams, unionPostsById, appVersionTag} from '../constants';
import {arweave, ardb} from '../api/arweave';
import Post from './Post';
import Form from './Form';
import Loading from './ui/Loading';
import {VertLine} from '../style/components/decoration';

function Timeline({txid, isComments}: {txid: string, isComments?: boolean}) {
  const {pathBase} = useParams<PathParams>();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      const queryResult = await ardb.search('transactions')
        .tag('App-Name', 'argora')
        .tag('App-Version', appVersionTag)
        .tag('reply-to', txid)
        .limit(30).find()

      const contents = queryResult.map(tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));
      
      Promise.all(contents).then(results => {
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
    } catch (e) {
      setError(`Could not retrieve toot: ${e}`);
    }
  }, [txid]);

  useEffect(() => {
    requestLastPosts();
    const interval = setInterval(requestLastPosts, 5000);
    return () => {
      clearInterval(interval);
      setPosts([]);
    };
  }, [requestLastPosts, setPosts]);

  return(
    <>
      <Form to={txid}
        submitted={(post: PostData) => setPosts(p => unionPostsById(p, [post]))} 
      />
      {!error && loading && <Loading />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {posts?.map((post, i) => (<div key={i}>
        {isComments && <VertLine />}
        {post.time
        ? <Link to={`/${pathBase}/${post.id}`}>
            <Post
              comment={isComments}
              id={post.id}
              data={post.data}
              owner={post.owner}
              time={post.time}
            />
          </Link>
        : <Post
            comment={isComments}
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