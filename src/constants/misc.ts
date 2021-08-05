import {createContext} from 'react';
import {PostData} from './types';

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
  walletAddr: string; 
  setWalletAddr: (addr: string) => void;
  theme: boolean;
  setTheme: (t: boolean) => void;
});

const img = {
  logoWhite: "https://rlegxo3dwxjxjijpubmitspnypm5dgjhydcnoznb545q4euc4x4q.arweave.net/ishru2O103ShL6BYicntw9nRmSfAxNdloe87DhKC5fk",
  logoBlack: "https://d5w5xofjuf6uvlazitfk5mvgaosjnpmso7j5olb46s2rj6m3rfma.arweave.net/H23buKmhfUqsGUTKrrKmA6SWvZJ309csPPS1FPmbiVg"
}

const appVersionTag = '0.0.1'; //dev
// const appVersionTag = '1.0'; 

export {unionPostsById, ctx, img, appVersionTag};