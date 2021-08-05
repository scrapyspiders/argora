import {useState, useContext} from 'react';
import {arweave} from '../../api/arweave';
import Form from '../ui/Form';
import {appVersionTag, ctx, PostData} from '../../constants';

function Timeline({submitted}: {submitted: (post: PostData) => void}) {
  const [loading, setLoading] = useState(false);
  const {walletAddr} = useContext(ctx);

  const handleSubmit = async (inputValue: string) => {
    setLoading(true);
    const tx = await arweave.createTransaction({
      data: JSON.stringify({
        text: inputValue
    })});
    tx.addTag('App-Name', 'argora');
    tx.addTag('App-Version', appVersionTag);
    tx.addTag('reply-to', 'world');
    await arweave.transactions.sign(tx);
    console.log(tx);
    const response = await arweave.transactions.post(tx);
    console.log(response.status);
    submitted({
      id: tx.id,
      owner: walletAddr,
      data: inputValue,
      time: 0
    });
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