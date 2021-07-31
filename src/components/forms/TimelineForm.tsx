import {useState} from 'react';
import arweave from '../../api/arweave';
import Form from '../ui/Form';

function Timeline() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (inputValue: string) => {
    setLoading(true);
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
    setLoading(false);
  };

  return(
    <Form
      loading={loading}
      handleSubmit={handleSubmit}
      placeholder="What's happening?"
      loginMessage="Wanna toot something to the world? Please log in."
    />
  );
}

export default Timeline;