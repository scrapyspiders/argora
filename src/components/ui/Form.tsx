import {useState, useContext} from 'react';
import {Avatar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Post, LeftSide, RightSide} from '../../style/components/post';
import {ButtonS, TextareaAutosizeS} from '../../style/components/material-ui';
import {Hr} from '../../style/components/decoration';
import ctx from '../../constants/ctx';
import {FormType} from '../../constants/types';

function Form({handleSubmit, placeholder, loginMessage}: FormType){
  const {walletAddr} = useContext(ctx);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return(
    walletAddr
    ? <Post>
        <LeftSide>
          <Avatar>{walletAddr.slice(0,2)}</Avatar>
        </LeftSide>
        <RightSide>
          <TextareaAutosizeS
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
          />
          <Hr />
          <ButtonS 
            variant="outlined"
            color="inherit"
            onClick={() => handleSubmit(inputValue)}
            style={{float: 'right'}}
            disabled={!inputValue}
          >
            Toot!
          </ButtonS>
        </RightSide>
      </Post>
    : <Alert severity="info">{loginMessage}</Alert>
  );
}

export default Form;