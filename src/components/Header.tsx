import {useEffect, useState, useContext} from 'react';
import {Toolbar, Button, AppBar} from '@material-ui/core';
import walletAddrCtx from '../constants/ctx';

import useArConnect from 'use-arconnect';

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
];

function Header() {

  const arConnect = useArConnect();
  const {walletAddr, setWalletAddr} = useContext(walletAddrCtx);
  const [walletName, setWalletName] = useState("");

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
          setWalletAddr(await arConnect.getActiveAddress());
          let walletNames = await arConnect.getWalletNames();
          setWalletName(walletNames[walletAddr]);
        }
      } catch {
        alert("Error: Could not get ACCESS_ADDRESS permission");
      }
    })();
  }, [arConnect, walletAddr, setWalletAddr]);

  const connectWallet = async () => {
    if (!arConnect) return window.open("https://arconnect.io");
    // logout
    if (walletAddr !== "") {
      await arConnect.disconnect();
      setWalletAddr("");
    } else {
      // login
      try {
        await arConnect.connect(arConnectPermissions);
        setWalletAddr(await arConnect.getActiveAddress());
        window.addEventListener("walletSwitch", (e: any) =>
          setWalletAddr(e.detail.address)
        );
      } catch {
        alert("Error: Could not connect to ArConnect");
      }
    }
  };

  return (
    <header className="App-header">
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className="wallet">
            {walletAddr !== "" && <>
              {walletName} - {walletAddr.slice(0,10)}...{walletAddr.slice(walletAddr.length-10, walletAddr.length)}
            </>}
          </div>
          <Button variant="outlined" color="inherit" onClick={connectWallet}>
            {(arConnect && (walletAddr === "" ? "Log In" : "Logout")) ||
              "Install ArConnect to log in"}
          </Button>
        </Toolbar>
      </AppBar>
      {walletAddr !== "" && 
      <div>
        connected
      </div>}
    </header>
  );
}

export default Header;
