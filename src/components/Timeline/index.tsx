import {useEffect, useState, useCallback, useContext, useRef} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AlertS} from '../../style/components/material-ui';
import {C_replyToRootName, C_replyToProfileName} from '../../constants';
import {PostData, PathParams, T_txid, T_timeline, T_walletAddr, T_planet} from '../../types';
import {arweave, getTimeline} from '../../api/arweave';
import Post from '../Post';
import Form from './Form';
import Loading from '../ui/Loading';
import {VertLine} from '../../style/components/decoration';
import {ctx, unionPostsById} from '../../utils';
import NoPost from './NoPost';

function Timeline({type, txid, planetName}: {type: T_timeline, txid: T_txid | T_walletAddr, planetName?: T_planet}) {
  const {pathBase, planet} = useParams<PathParams>();
  const componentTracker = useRef(0);
  
  const {walletAddr} = useContext(ctx);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<(PostData)[]>();

  const requestLastPosts = useCallback(async () => {
    try {
      componentTracker.current++;
      console.log(`${Date.now()}: query - componentTracker = ${componentTracker.current}`);
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
         
        // component got unmounted->mounted during function execution.
        // Therefore the result of `query` doesn't match anymore the timeline we want to show
        if(--componentTracker.current < 0) // We do not update any state
          componentTracker.current = 0;    // tracker reinitialization
        else {
          console.log(`${Date.now()}: setPosts()`);
          setPosts(p => unionPostsById(p, lastPosts));
          setLoading(false);
        }
      });
    } catch (e) {
      setLoading(false);
      setError(`Could not retrieve Weeve: ${e}`);
    }
  }, [type, planet, txid]);

  useEffect(() => {
    setLoading(true);
    console.log(`${Date.now()}: useEffect - componentTracker = ${componentTracker.current}`)
    requestLastPosts();
    const interval = setInterval(requestLastPosts, 5000);
    return () => {
      componentTracker.current = 0;
      console.log(`${Date.now()}: useEffect return - componentTracker = ${componentTracker.current}`)
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
        {planet ? `Planet 🪐 ${planet}` : "The Metaweave"}
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
      {loading && <Loading type="timeline" />}
      {error && <AlertS severity="error">{error}</AlertS>}
      {!loading && !error && posts && posts.length < 1 
      ? <NoPost type={type} />
      : posts?.map((post, i) => (<div key={i}>
          {type === "comments" && <VertLine />}
          {post.time
          ? <Link to={`/${pathBase}/thread/${post.id}`}>
              {displayPost(post)}
            </Link>
          : displayPost(post)
          }
        </div>))
      }
    </>
  );
}

export default Timeline;