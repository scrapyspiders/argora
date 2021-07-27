import {Toolbar, AppBar} from '@material-ui/core';
import LoginButton from './LoginButton';

function Header() {
  return (
    <header className="App-header">
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className="wallet">
            <img src="/arweave.png" alt="arweave logo" height="50" />
          </div>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
