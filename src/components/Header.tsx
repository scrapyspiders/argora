import {useContext} from 'react';
import {Toolbar, AppBar} from '@material-ui/core';
import walletAddrCtx from '../constants/ctx';
import LoginButton from './LoginButton';

function Header() {

  const {walletAddr} = useContext(walletAddrCtx);

  return (
    <header className="App-header">
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className="wallet">
            {walletAddr !== "" && <>
              {walletAddr.slice(0,10)}...{walletAddr.slice(walletAddr.length-10, walletAddr.length)}
            </>}
          </div>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
