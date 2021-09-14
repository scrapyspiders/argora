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

const getVertoIDbyAddr = (addr: T_walletAddr | undefined): (T_userVertoID | null) => {
  const vertoUsers = localStorage.getItem('vertoUsers');

  if(!vertoUsers)
    return null;
  else{
    const user = JSON.parse(vertoUsers)
    .filter((user: T_userVertoID) => user.addresses.find((address: T_walletAddr) => address === addr))[0];
    
    return user ? user : null;
  }
};

const getVertoIDbyUsername = (username: string): (T_userVertoID | null) => {
  const vertoUsers = localStorage.getItem('vertoUsers');

  if(!vertoUsers)
    return null;
  else{
    const user = JSON.parse(vertoUsers)
    .find((user: T_userVertoID) => user.username === username);

    return user ? user : null;
  }
}

const getVertoIDsuggestions = (username: string): T_userVertoID[] | undefined => {
  const vertoUsers = localStorage.getItem('vertoUsers');

  if(!vertoUsers)
    return undefined;
  else{
    const regex = new RegExp(`^${username}`);
    const users = JSON.parse(vertoUsers)
    .filter((user: T_userVertoID) => regex.test(user.username));

    return users.length > 0 ? users : undefined;
  }
}

export {decodeData, unionPostsById, getVertoIDbyAddr, getVertoIDbyUsername, getVertoIDsuggestions};