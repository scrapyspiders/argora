import {Toolbar, Grid} from '@material-ui/core';
import {useContext} from 'react';
import LoginButton from './LoginButton';
import ThemeButton from './ThemeButton';
import {AppBarS} from '../../style/components/material-ui';
import img from '../../constants/img';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from "@material-ui/core/Slide";
import ctx from '../../constants/ctx';

function HideOnScroll({children}: {children: React.ReactElement}) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header() {
  const {theme} = useContext(ctx);

  return (<>
    <HideOnScroll>
      <AppBarS>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {theme 
              ? <img src={img.logoBlack} alt="Argora" />
              : <img src={img.logoWhite} alt="Argora" />
            }
            <div>
              <ThemeButton />
              <LoginButton />
            </div>
          </Grid>
        </Toolbar>
      </AppBarS>
    </HideOnScroll>
    <Toolbar />
  </>);
}

export default Header;
