import {useContext} from 'react';
import {IconButtonS} from '../../style/components/material-ui';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ctx from '../../constants/ctx';

function ThemeButton() {
  const {theme, setTheme} = useContext(ctx);
  const icon = theme ? <Brightness2Icon /> : <WbSunnyIcon />

  return(
    <IconButtonS
      onClick={() => setTheme(!theme)}
    >
      {icon}
    </IconButtonS>
  );
}

export default ThemeButton;