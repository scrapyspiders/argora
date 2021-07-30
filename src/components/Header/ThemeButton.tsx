import {useContext} from 'react';
import {IconButtonS} from '../../style/components/material-ui';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import ctx from '../../constants/ctx';

function ThemeButton() {
  const {theme, setTheme} = useContext(ctx);
  const icon = theme ? <Brightness2Icon /> : <Brightness5Icon />

  return(
    <IconButtonS
      onClick={() => setTheme(!theme)}
    >
      {icon}
    </IconButtonS>
  );
}

export default ThemeButton;