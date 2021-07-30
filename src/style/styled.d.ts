// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    // default
    borderRadius?: string;
    colors?: {
      main: string;
      secondary: string;
    };

    // custom (see themes.ts)
    body: string;
    text: string;
    shadow: string;
  }
}