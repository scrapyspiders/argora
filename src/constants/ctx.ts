import {createContext} from 'react';

const walletAddrCtx = createContext({} as { 
  walletAddr: string; 
  setWalletAddr: (addr: string) => void; 
});

export default walletAddrCtx;