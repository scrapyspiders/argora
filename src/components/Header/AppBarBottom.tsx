import {Toolbar} from '@material-ui/core';
import {AppBarBottomS} from '../../style/components/Header';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from "@material-ui/core/Slide";
import Search from './Search';

function HideOnScroll({children}: {children: React.ReactElement}) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={trigger}>
      {children}
    </Slide>
  );
}

function AppBarBottom() {
  return (
    <div className="mobile">
      <Toolbar />
      {/* <HideOnScroll> */}
        <AppBarBottomS>
          <Toolbar>
            <Search />
          </Toolbar>
        </AppBarBottomS>
      {/* </HideOnScroll> */}
    </div>
  );
}

export default AppBarBottom;
