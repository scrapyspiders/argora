import {useState, useContext} from 'react';
import {arweave} from '../api/arweave';
import FormUI from './ui/Form';
import {appVersionTag, ctx, PostData} from '../constants';

function Form({submitted, to}: {submitted: (post: PostData) => void, to: string}) {
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
    tx.addTag('reply-to', to);
    await arweave.transactions.sign(tx);
    console.log(tx);
    const response = await arweave.transactions.post(tx);
    console.log(response.status);
    submitted({
      id: tx.id,
      owner: walletAddr,
      data: inputValue,
      time: 0,
      replyTo: to
    });
    setLoading(false);
  }

  const placeholder = to === "world" ? "What's happening?" : "Toot your reply!";
  const loginMessage = to === "world" ? "Wanna toot something to the world? Please log in." : "Wanna reply to this? Please log in.";

  return(
    <FormUI
      comment={to !== "world"}
      loading={loading}
      handleSubmit={handleSubmit}
      placeholder={placeholder}
      loginMessage={loginMessage}
    />
  );
}

export default Form;