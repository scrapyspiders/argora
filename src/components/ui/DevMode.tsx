import {Link} from 'react-router-dom';
import {Alert} from '@material-ui/lab';

function DevMode() {
  return(
    <Alert severity="info">
      I see you are in dev mode, in production (released on arweave), 
      the path name always start with the transaction id.
      <br />
      <Link to="/app-txid-placeholder">
        Click here to simulate the production behavior
      </Link>
    </Alert>
  );
}

export default DevMode;