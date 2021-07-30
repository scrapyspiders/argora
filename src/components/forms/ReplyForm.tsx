import arweave from '../../api/arweave';
import Form from '../ui/Form';

function Reply({to}: {to: string}) {

  const handleSubmit = async (inputValue: string) => {
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
    <Form
      handleSubmit={handleSubmit}
      placeholder="Toot your reply!"
      loginMessage="Wanna reply to this? Please log in."
    />
  );
}

export default Reply;