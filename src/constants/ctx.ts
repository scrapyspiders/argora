import {createContext} from 'react';

const ctx = createContext({} as { 
  walletAddr: string; 
  setWalletAddr: (addr: string) => void;
  theme: boolean;
  setTheme: (t: boolean) => void;
});

export default ctx;