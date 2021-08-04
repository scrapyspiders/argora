import {useState, useContext} from 'react';
import {arweave} from '../../api/arweave';
import Form from '../ui/Form';
import {appVersionTag, ctx, PostData} from '../../constants';

function Reply({submitted, to}: {submitted: (post: PostData) => void, to: string}) {
  const [loading, setLoading] = useState(false);
  const {walletAddr} = useContext(ctx);

  const handleSubmit = async (inputValue: string) => {
    setLoading(true);
    const tx = await arweave.createTransaction({
      data: inputValue
    });
    tx.addTag('App-Name', 'argora');
    tx.addTag('App-Version', appVersionTag);
    tx.addTag('reply-to', to);
    await arweave.transactions.sign(tx);
    console.log(tx);
    const response = await arweave.transactions.post(tx);
    console.log(response.status);
    submitted({
      id: tx.id,
      owner: walletAddr,
      content: inputValue,
      time: 0,
      replyTo: to
    });
    setLoading(false);
  }

  return(
    <Form
      comment
      loading={loading}
      handleSubmit={handleSubmit}
      placeholder="Toot your reply!"
      loginMessage="Wanna reply to this? Please log in."
    />
  );
}

export default Reply;