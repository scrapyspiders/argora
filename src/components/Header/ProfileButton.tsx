import React, {useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import useArConnect from 'use-arconnect';
import ctx from '../../constants/ctx';
import {PathParams} from '../../constants/types';
import {Menu, MenuItem} from '@material-ui/core';
import {IconButtonS} from '../../style/components/material-ui';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function ProfileButton(){
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

  const history = useHistory();
  const {pathBase} = useParams<PathParams>();

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
        <MenuItem onClick={() => history.push(`/${pathBase}/profile/${walletAddr}`)}>Profile</MenuItem>
        <MenuItem onClick={disconnectWallet}>Logout</MenuItem>
      </Menu>
    </>
  ); 
}

export default ProfileButton;