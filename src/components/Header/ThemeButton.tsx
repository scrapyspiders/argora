import {useContext, useEffect} from 'react';
import {IconButtonS} from '../../style/components/material-ui';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import {ctx} from '../../constants';

const mq = window.matchMedia('(prefers-color-scheme: dark)');

function ThemeButton() {
  const {theme, setTheme} = useContext(ctx);
  const icon = theme ? <Brightness2Icon /> : <WbSunnyIcon />
  
  // eslint-disable-next-line
  useEffect(() => {setTheme(!mq.matches)}, []);

  return(
    <IconButtonS
      onClick={() => setTheme(!theme)}
    >
      {icon}
    </IconButtonS>
  );
}

export default ThemeButton;