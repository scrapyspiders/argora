import {useEffect, useState, useCallback, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../../style/components/material-ui';
import {unionPostsById, ctx, C_replyToRootName, C_replyToProfileName} from '../../constants';
import {PostData, PathParams, T_txid, T_timeline, T_walletAddr, T_planet} from '../../types';
import {arweave, getTimeline} from '../../api/arweave';
import Post from '../Post';
import Form from './Form';
import Loading from '../ui/Loading';
import {VertLine} from '../../style/components/decoration';

function Timeline({type, txid, planetName}: {type: T_timeline, txid: T_txid | T_walletAddr, planetName?: T_planet}) {
  const {pathBase, planet} = useParams<PathParams>();
  
  const {walletAddr} = useContext(ctx);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    console.log("requestLastPosts function");
    try {
      const query = await getTimeline(type, planet, txid);
      const contents = query.result.map(tx => arweave.transactions.getData(tx.id, {decode: true, string: true}));

      Promise.all(contents).then(results => {
        const lastPosts: PostData[] = query.result.map((tx, i) => {
          let post = {
            id: tx.id,
            data: results[i],
            owner: 'owner' in tx ? tx.owner.address : undefined,
            time: 'block' in tx ? tx.block?.timestamp : undefined
          }
          if(type !== "comments"){
            post = {
              ...post,
              ...{
                replyTo: query.replyToTags[i]?.value === C_replyToRootName ? undefined : query.replyToTags[i]?.value,
                planet: query.planetTags[i]?.value
              }
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
  }, [type, planet, txid]);

  useEffect(() => {
    requestLastPosts();
    const interval = setInterval(requestLastPosts, 5000);
    return () => {
      clearInterval(interval);
      setPosts([]);
    };
  }, [requestLastPosts, setPosts]);

  const displayPost = (post: PostData) => <Post
    type={type === "comments" ? "comment" : "world"}
    id={post.id}
    data={post.data}
    owner={post.owner}
    time={post.time}
    replyTo={post.replyTo}
    planet={planet ? undefined : post.planet} // do not display planet when browsing the planet root timeline
  />;

  return(
    <>
      {type === "main" && <h1 style={{textAlign: 'center'}}>
        {planet ? `Planet 🪐 ${planet}` : "Metaweave"}
      </h1>}
      {(
        (type === "profile" && txid === walletAddr) 
        || (type !== "profile")
      ) 
      && <Form
        type={type}
        submitted={(post: PostData) => setPosts(p => unionPostsById(p, [post]))}
        to={type === "comments" ? txid : type === "profile" ? C_replyToProfileName : C_replyToRootName}
        planet={planetName ? planetName : planet}
      />}
      {!error && loading && <Loading type="timeline" />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {posts?.map((post, i, postsArray) => (<div key={i}>
        {type === "comments" && <VertLine />}
        {post.time
        ? <Link to={`/${pathBase}/thread/${post.id}`}>
            {displayPost(post)}
          </Link>
        : displayPost(post)
        }
      </div>))}
    </>
  );
}

export default Timeline;