import { createContext } from "react";
import { T_walletAddr } from "../types";

const ctx = createContext({} as { 
  walletAddr: T_walletAddr; 
  setWalletAddr: (addr: string) => void;
  theme: boolean;
  setTheme: (t: boolean) => void;
});

export {ctx};