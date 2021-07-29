import { PaletteType } from '@material-ui/core';

const main = {
  typography: {
    fontFamily: 'monospace'
  }
}

const light = {
  ...main,
  palette: {
    type: 'light' as PaletteType
  },
};

const dark = {
  ...main,
  palette: {
    type: 'dark' as PaletteType
  },
};

export {light, dark};