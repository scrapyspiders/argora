import {useState, useContext} from 'react';
import {Avatar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import arweave from '../../api/arweave';
import ctx from '../../constants/ctx';
import {Post, LeftSide, RightSide} from '../../style/components/post';
import {ButtonS, TextareaAutosizeS} from '../../style/components/material-ui';
import {Hr} from '../../style/components/decoration';

function Timeline() {
  const {walletAddr} = useContext(ctx);
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
    walletAddr
    ? <Post>
        <LeftSide>
          <Avatar>{walletAddr.slice(0,2)}</Avatar>
        </LeftSide>
        <RightSide>
          <TextareaAutosizeS
            placeholder="What's happening?"
            value={inputValue}
            onChange={handleChange}
          />
          <Hr />
          <ButtonS 
            variant="outlined"
            color="inherit"
            onClick={handleSubmit}
            style={{float: 'right'}}
            disabled={!inputValue}
          >
            Toot!
          </ButtonS>
        </RightSide>
      </Post>
    : <Alert severity="info">Wanna toot something to the world? Please log in.</Alert>
  );
}

export default Timeline;