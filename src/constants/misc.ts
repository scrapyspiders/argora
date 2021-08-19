import {createContext} from 'react';
import {PostData, T_walletAddr} from '../types';

const unionPostsById = (currentPosts: PostData[] | undefined, newPosts: PostData[]) => {
  if(!currentPosts)
    return newPosts;
  else {
    // update timestamp from newPosts (undefined -> number)
    currentPosts = currentPosts.map(p => {
      const np = newPosts.find(({id}) => id === p.id);
      p.time = np?.time;
      return p;
    });

    const difference = newPosts.filter(
      ({ id: id1 }) => !currentPosts?.some(
      ({ id: id2 }) => id2 === id1));
    
    return([...difference, ...currentPosts]);
  }
}

const ctx = createContext({} as { 
  walletAddr: T_walletAddr; 
  setWalletAddr: (addr: string) => void;
  theme: boolean;
  setTheme: (t: boolean) => void;
});

const img = {
  logoWhite: "https://rlegxo3dwxjxjijpubmitspnypm5dgjhydcnoznb545q4euc4x4q.arweave.net/ishru2O103ShL6BYicntw9nRmSfAxNdloe87DhKC5fk",
  logoBlack: "https://d5w5xofjuf6uvlazitfk5mvgaosjnpmso7j5olb46s2rj6m3rfma.arweave.net/H23buKmhfUqsGUTKrrKmA6SWvZJ309csPPS1FPmbiVg"
};

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

const C_appVersionTag = ['1.0-dev', '1.1-dev']; //dev
// const C_appVersionTag = ['1.0', '1.1']; 
const C_replyToRootName = "world";
const C_replyToProfileName = "profile";

export {
  unionPostsById,
  ctx,
  img,
  decodeData,
  C_appVersionTag,
  C_replyToRootName,
  C_replyToProfileName
};