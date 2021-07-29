import {Toolbar, AppBar, Grid} from '@material-ui/core';
import LoginButton from './LoginButton';
import ThemeButton from './ui/ThemeButton';

function Header() {
  return (
    <header className="App-header">
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src="/arweave.png" alt="arweave logo" height="50" />
            <div>
              <ThemeButton />
              <LoginButton />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
