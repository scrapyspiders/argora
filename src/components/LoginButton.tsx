import {useEffect, useContext} from 'react';
import {Button} from '@material-ui/core';
import useArConnect from 'use-arconnect';
import walletAddrCtx from '../constants/ctx';

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
];

function LoginButton() {
  const arConnect = useArConnect();
  const {walletAddr, setWalletAddr} = useContext(walletAddrCtx);

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
          setWalletAddr(await arConnect.getActiveAddress());
          // let walletNames = await arConnect.getWalletNames();
          // setWalletName(walletNames[walletAddr]);
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

  return(
    <Button variant="outlined" color="inherit" onClick={connectWallet}>
      {(arConnect && (walletAddr === "" ? "Log In" : "Logout")) ||
        "Install ArConnect to log in"}
    </Button>
  );
}

export default LoginButton;