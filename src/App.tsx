import {useState} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';
import ctx from './constants/ctx';
import Header from './components/Header';
import Timeline from './components/Timeline';
import Thread from './components/Thread';
import DevMode from './components/ui/DevMode';
import {light, dark} from './constants/themes';

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
      <ThemeProvider theme={createTheme(theme ? light : dark)}>
        <div className="App">
          <Header />
          <Router history={history}>
            <Switch>
              <Route exact path='/'><DevMode /></Route>
              <Route exact path='/:pathBase'><Timeline /></Route>
              <Route path='/:pathBase/:txid'><Thread /></Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
