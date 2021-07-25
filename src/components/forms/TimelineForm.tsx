import {useState} from 'react';
import arweave from '../../api/arweave';
import {TextField, Button} from '@material-ui/core';

function Timeline() {
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
    tx.addTag('reply-to', 'world');
    await arweave.transactions.sign(tx);
    console.log(tx);
    const response = await arweave.transactions.post(tx);
    console.log(response.status);
  };

  return(
    <form>
      <TextField
        label="What's happening?"
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
  );
}

export default Timeline;