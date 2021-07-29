import {useContext} from 'react';
import {Toolbar, AppBar, IconButton} from '@material-ui/core';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import LoginButton from './LoginButton';
import ctx from '../constants/ctx';

function Header() {
  const {theme, setTheme} = useContext(ctx);

  const icon = theme ? <Brightness2Icon /> : <Brightness5Icon />

  return (
    <header className="App-header">
      <AppBar position="static">
        <Toolbar>
          <div className="wallet">
            <img src="/arweave.png" alt="arweave logo" height="50" />
            <IconButton 
              edge="end"
              onClick={() => setTheme(!theme)}
            >
              {icon}
            </IconButton>
          </div>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
