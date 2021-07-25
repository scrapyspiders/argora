import {useEffect, useState} from 'react';
import { Toolbar, Button, AppBar } from '@material-ui/core';

import useArConnect from 'use-arconnect';
import TimelineForm from './forms/TimelineForm';

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
];

function Login() {

  const arConnect = useArConnect();
  const [walletAddr, setWalletAddr] = useState("");
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
  }, [arConnect, walletAddr]);

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
    <>
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
        <TimelineForm />
      </div>}
    </>
  );
}

export default Login;
