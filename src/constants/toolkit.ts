import {PostData} from './types';

const unionPostsById = (currentPosts: PostData[] | undefined, newPosts: PostData[]) => {
  if(!currentPosts)
    return newPosts;
  else {
    // debug purpose only:
    // let currentPosts = posts.slice(2, 10);
    // let newPosts = posts.slice(0, 4);

    // console.log("posts", posts);
    // console.log("newPosts", newPosts);
    const difference = newPosts.filter(
      ({ id: id1 }) => !currentPosts.some(
      ({ id: id2 }) => id2 === id1));
    
    // console.log("difference", difference);
    // console.log("posts + newPosts difference", [...difference, ...posts]);
    return([...difference, ...currentPosts]);
  }
}

export {unionPostsById};