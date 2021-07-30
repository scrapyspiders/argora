import {Toolbar, Grid} from '@material-ui/core';
import LoginButton from './LoginButton';
import ThemeButton from './ui/ThemeButton';
import {AppBarS} from '../style/components';

function Header() {
  return (
    <AppBarS position="static">
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
    </AppBarS>
  );
}

export default Header;
