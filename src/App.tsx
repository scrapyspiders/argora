import {useState, useEffect} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {C_replyToRootName} from './constants';
import {ctx} from './utils';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './style/global';
import {light, dark} from './style/themes';

import Header from './components/Header';
import DevMode from './components/ui/DevMode';
import Profile from './components/Profile';
import Timeline from './components/Timeline';
import Thread from './components/Thread';

import {getVertoPeople} from './api/arweave';
import Planet from './components/Planet';
import AppBarBottom from './components/Header/AppBarBottom';

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

  const [vertoUsersLocalStorage, setVertoUsersLocalStorage] = useState(false);

  useEffect(() => {
    (async () => {
      const users = await getVertoPeople();
      localStorage.setItem('vertoUsers', JSON.stringify(users));
      localStorage.setItem('vertoUsersTimestamp', Date.now().toString());
      setVertoUsersLocalStorage(true);
    })()
  });

  return (
    <ctx.Provider value={{
      walletAddr, setWalletAddr, 
      theme, setTheme,
      vertoUsersLocalStorage
    }}>
      <ThemeProvider theme={theme ? light : dark}>
        <GlobalStyles />
        <main>
          <Router history={history}>
            <Switch>
              <Route exact path='/'><Header /><DevMode /><AppBarBottom /></Route>
              <Route exact path='/:pathBase/profile/:addr'><Header /><Profile /></Route>
              <Route exact path='/:pathBase/thread/:txid'><Header /><Thread /></Route>
              <Route exact path='/:pathBase/planet/:planet'><Header /><Planet /><AppBarBottom /></Route>
              <Route exact path='/:pathBase'><Header /><Timeline type="main" txid={C_replyToRootName} /><AppBarBottom /></Route>
            </Switch>
          </Router>
        </main>
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
