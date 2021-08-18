import {useEffect, useState, useCallback, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../../style/components/material-ui';
import {unionPostsById, ctx} from '../../constants';
import {PostData, PathParams, T_txid, T_timeline, T_walletAddr} from '../../types';
import {arweave, getTimeline} from '../../api/arweave';
import Post from './Post';
import Form from './Form';
import Loading from '../ui/Loading';
import {VertLine} from '../../style/components/decoration';

function Timeline({txid, type}: {txid: T_txid | T_walletAddr, type: T_timeline}) {
  const {pathBase} = useParams<PathParams>();
  const {walletAddr} = useContext(ctx);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      const query = await getTimeline(type, txid);
      const contents = query.result.map(tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));
      
      Promise.all(contents).then(results => {
        const lastPosts: PostData[] = query.result.map((tx, i) => {
          let post = {
            id: tx.id,
            data: results[i],
            owner: 'owner' in tx ? tx.owner.address : undefined,
            time: 'block' in tx ? tx.block?.timestamp : undefined
          }
          if(type === "profile"){
            post = {
              ...post,
              ...{replyTo: query.replyToTags[i]?.value === "world" ? undefined : query.replyToTags[i]?.value}
            }
          }
          return post;
        });
        setPosts(p => unionPostsById(p, lastPosts));
        setLoading(false);
      });
    } catch (e) {
      setError(`Could not retrieve toot: ${e}`);
    }
  }, [txid, type]);

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
      {(
        (type === "profile" && txid === walletAddr) 
        || (type !== "profile")
      ) 
      && <Form
        type={type}
        submitted={(post: PostData) => setPosts(p => unionPostsById(p, [post]))}
        to={type === "comments" ? txid : "world"}
      />}
      {!error && loading && <Loading type="timeline" />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {posts?.map((post, i) => (<div key={i}>
        {type === "comments" && <VertLine />}
        {post.time
        ? <Link to={`/${pathBase}/${post.id}`}>
            <Post
              comment={type === "comments"}
              id={post.id}
              data={post.data}
              owner={post.owner}
              time={post.time}
              replyTo={post.replyTo}
            />
          </Link>
        : <Post
            comment={type === "comments"}
            id={post.id}
            data={post.data}
            owner={post.owner}
            time={post.time}
            replyTo={post.replyTo}
          />
        }
      </div>))}
    </>
  );
}

export default Timeline;