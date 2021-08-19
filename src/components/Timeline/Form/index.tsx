import {useState, useContext} from 'react';
import {arweave} from '../../../api/arweave';
import FormUI from './UI';
import {C_appVersionTag, ctx, C_replyToRootName} from '../../../constants';
import {FormPictureType, PostData, T_txid, T_timeline, T_planet} from '../../../types';

function Form({submitted, type, to, planet}: {submitted: (post: PostData) => void, type: T_timeline, to: T_txid, planet: T_planet}) {
  const [loading, setLoading] = useState(false);
  const {walletAddr} = useContext(ctx);

  const handleSubmit = async (inputValue: string, picture: FormPictureType | null, callback: () => void) => {
    const sendText = async (text: string, txPic?: string) => {
      const data = txPic ? {text: text, pictures: [txPic]} : {text: text};
      const tx = await arweave.createTransaction({data: JSON.stringify(data)});

      tx.addTag('App-Name', 'argora');
      tx.addTag('App-Version', C_appVersionTag[C_appVersionTag.length-1]);
      tx.addTag('reply-to', to);
      if(planet) tx.addTag('planet', planet);
      
      await arweave.transactions.sign(tx);
      console.log(tx);
      const response = await arweave.transactions.post(tx);
      console.log(response.status);
      
      submitted({
        id: tx.id,
        owner: walletAddr,
        data: JSON.stringify(data),
        time: 0,
        replyTo: to
      });
      
      setLoading(false);
      callback();
    };
    
    setLoading(true);
    if(picture){
      let blob = await fetch(picture.blobUrl).then(r => r.blob());

      const reader = new FileReader();
      reader.addEventListener('loadend', async () => {
        if(reader.result){
          const tx = await arweave.createTransaction({data: reader.result});
          tx.addTag('Content-Type', picture.type);
          await arweave.transactions.sign(tx);
          const response = await arweave.transactions.post(tx);
          console.log(response.status);
          sendText(inputValue, tx.id);
        }
      });
      reader.readAsArrayBuffer(blob);
    }
    else
      sendText(inputValue);
  }

  const placeholder = to === C_replyToRootName ? "What's happening?" : "Toot your reply!";
  const loginMessage = to === C_replyToRootName ? "Wanna toot something to the world? Please log in." : "Wanna reply to this? Please log in.";

  return(
    <FormUI
      type={type}
      loading={loading}
      handleSubmit={handleSubmit}
      placeholder={placeholder}
      loginMessage={loginMessage}
    />
  );
}

export default Form;