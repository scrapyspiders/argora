import React, {useState, useContext} from 'react';
import useArConnect from 'use-arconnect';
import ctx from '../constants/ctx';
import {Menu, MenuItem, Avatar} from '@material-ui/core';

function HeaderProfile(){
  const arConnect = useArConnect();
  const {walletAddr, setWalletAddr} = useContext(ctx);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement | null)>(null);

  const disconnectWallet = async () => {
    await arConnect.disconnect();
    setWalletAddr("");
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      <span>{walletAddr.slice(0,10)}...{walletAddr.slice(walletAddr.length-10, walletAddr.length)}</span>
      <Avatar onClick={handleClick} style={{cursor: "pointer"}}>
        {walletAddr.slice(0,3)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={disconnectWallet}>Logout</MenuItem>
      </Menu>
    </>
  ); 
}

export default HeaderProfile;