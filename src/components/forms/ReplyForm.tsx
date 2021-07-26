import {useState, useContext} from 'react';
import {TextField, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import arweave from '../../api/arweave';
import walletAddrCtx from '../../constants/ctx';

function Reply({to}: {to: string}) {
  const {walletAddr} = useContext(walletAddrCtx);
  const [inputValue, setInputValue] = useState<string>("");
  
  const handleChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const tx = await arweave.createTransaction({
      data: inputValue
    });
    tx.addTag('App-Name', 'argora');
    tx.addTag('App-Version', '0.0.1');
    tx.addTag('reply-to', to);
    await arweave.transactions.sign(tx);
    console.log(tx);
    const response = await arweave.transactions.post(tx);
    console.log(response.status);
  }

  return(
    walletAddr
    ? <form>
        <TextField
          label="Toot your reply!"
          multiline
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
          fullWidth={true}
          style={{marginTop: '20px'}}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Toot!
        </Button>
      </form>
    : <Alert severity="info">Wanna reply to this? Please log in.</Alert>
  );
}

export default Reply;