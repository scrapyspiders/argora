import { Router, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Alert } from '@material-ui/lab';
import Login from './components/Login';
import Timeline from './components/Timeline';
import Thread from './components/Thread';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
      </header>
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <Alert severity="info">
              I see you are in dev mode, in production (released on arweave), the path name always start with the transaction id.
              <br />
              <Link to="/app-txid-placeholder">
                Click here to simulate the production behavior
              </Link>
            </Alert>
          </Route>
          <Route exact path='/:pathBase'>
            <h1>Timeline</h1>
            <Timeline></Timeline>
          </Route>
          <Route path='/:pathBase/:txid'>
            <Thread></Thread>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
