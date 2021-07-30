import {Toolbar, Grid} from '@material-ui/core';
import LoginButton from './LoginButton';
import ThemeButton from './ThemeButton';
import {AppBarS} from '../../style/components/material-ui';
import img from '../../constants/img';

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
          <img src={img.logo} alt="arweave logo" height="50" />
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
