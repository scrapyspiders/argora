import { PostData, T_userVertoID, T_walletAddr } from "../types";

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const decodeData = (data: string | Uint8Array) => {
  if(typeof data !== 'string')
    return {content: "data is not string", picture: null};
  
  try {
    const pData = JSON.parse(data);

    return {
      content: 'text' in pData && typeof pData.text === 'string' ? pData.text : data, 
      picture: 'pictures' in pData && pData.pictures.length > 0 ? escapeHtml(pData.pictures[0]) : null
    };
  }
  catch {
    return {content: data, picture: null};
  }
};

const unionPostsById = (currentPosts: PostData[] | undefined, newPosts: PostData[]) => {
  if(!currentPosts)
    return newPosts;
  else {
    // update timestamp from newPosts (undefined -> number)
    currentPosts = currentPosts.map(p => {
      const np = newPosts.find(({id}) => id === p.id);
      if(np)
        p.time = np.time;
      return p;
    });

    const difference = newPosts.filter(
      ({ id: id1 }) => !currentPosts?.some(
      ({ id: id2 }) => id2 === id1));
    
    return([...difference, ...currentPosts]);
  }
};

const getUsernameFromAddr = (addr: T_walletAddr | undefined) => {
  const defaultUsername = `@${addr?.slice(0,5)}...${addr?.slice(addr?.length-5, addr?.length)}`;
  const vertoUsers = localStorage.getItem('vertoUsers');

  if(!vertoUsers)
    return defaultUsername;
  else{
    const user = JSON.parse(vertoUsers)
    .filter((user: T_userVertoID) => user.addresses.find((address: T_walletAddr) => address === addr))[0];
    
    console.log(user);

    return user ? user.username : defaultUsername;
  }
};

export {decodeData,unionPostsById,getUsernameFromAddr};