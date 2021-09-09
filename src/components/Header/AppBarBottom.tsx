import {Toolbar} from '@material-ui/core';
import {AppBarBottomS} from '../../style/components/Header';
import Search from './Search';

function AppBarBottom() {
  return (
    <div className="mobile">
      <Toolbar />
      <AppBarBottomS>
        <Toolbar>
          <Search />
        </Toolbar>
      </AppBarBottomS>
    </div>
  );
}

export default AppBarBottom;
