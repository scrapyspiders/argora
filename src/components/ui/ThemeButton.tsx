import {useContext} from 'react';
import {IconButton} from '@material-ui/core';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import ctx from '../../constants/ctx';

function ThemeButton() {
  const {theme, setTheme} = useContext(ctx);
  const icon = theme ? <Brightness2Icon /> : <Brightness5Icon />

  return(
    <IconButton 
      edge="end"
      onClick={() => setTheme(!theme)}
    >
      {icon}
    </IconButton>
  );
}

export default ThemeButton;