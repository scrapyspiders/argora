import {useState} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import walletAddrCtx from './constants/ctx';
import Header from './components/Header';
import Timeline from './components/Timeline';
import Thread from './components/Thread';
import DevMode from './components/ui/DevMode';

const history = createBrowserHistory();

function App() {
  const [walletAddr, updateWalletAddr] = useState("");
  const setWalletAddr = (addr: string) => {
    updateWalletAddr(addr);
  }

  return (
    <walletAddrCtx.Provider value={{walletAddr, setWalletAddr}}>
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
    </walletAddrCtx.Provider>
  );
}

export default App;
