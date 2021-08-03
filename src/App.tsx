import {useState} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ctx from './constants/ctx';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './style/global';
import {light, dark} from './style/themes';

import Header from './components/Header/AppBar';
import DevMode from './components/ui/DevMode';
import Profile from './components/Profile';
import Timeline from './components/Timeline';
import Thread from './components/Thread';

const history = createBrowserHistory();

function App() {
  const [walletAddr, updateWalletAddr] = useState("");
  const setWalletAddr = (addr: string) => {
    updateWalletAddr(addr);
  }

  const [theme, updateTheme] = useState(true);
  const setTheme = (t: boolean) => {
    updateTheme(t);
  }

  return (
    <ctx.Provider value={{
      walletAddr, setWalletAddr, 
      theme, setTheme
    }}>
      <ThemeProvider theme={theme ? light : dark}>
        <GlobalStyles />
        <Router history={history}>
          <main>
            <Switch>
              <Route exact path='/'><Header /><DevMode /></Route>
              <Route exact path='/:pathBase/profile/:addr'><Header /><Profile /></Route>
              <Route exact path='/:pathBase'><Header /><Timeline /></Route>
              <Route path='/:pathBase/:txid'><Header /><Thread /></Route>
            </Switch>
          </main>
        </Router>
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
