import {Toolbar, Grid} from '@material-ui/core';
import {Link, useParams} from 'react-router-dom';
import {img, ctx} from '../../constants';
import {PathParams} from '../../types';
import {useContext} from 'react';
import LoginButton from './LoginButton';
import ThemeButton from './ThemeButton';
import {AppBarS} from '../../style/components/material-ui';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from "@material-ui/core/Slide";
import Search from './Search';

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

  const {pathBase} = useParams<PathParams>();
  
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
            <Link to={`/${pathBase}`}>
              {theme 
                ? <img src={img.logoBlack} alt="Argora" />
                : <img src={img.logoWhite} alt="Argora" />
              }
            </Link>
            <Search />
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
