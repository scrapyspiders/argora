import React, {useState, useContext} from 'react';
import useArConnect from 'use-arconnect';
import ctx from '../../constants/ctx';
import {Menu, MenuItem} from '@material-ui/core';
import {IconButtonS} from '../../style/components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function ProfileButton(){
  const arConnect = useArConnect();
  const {setWalletAddr} = useContext(ctx);
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
      <IconButtonS onClick={handleClick}>
        <AccountCircleIcon />
      </IconButtonS>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={disconnectWallet}>Logout</MenuItem>
      </Menu>
    </>
  ); 
}

export default ProfileButton;