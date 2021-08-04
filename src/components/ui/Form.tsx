import {useState, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Avatar} from '@material-ui/core';
import {Main, LeftSide, RightSide} from '../../style/components/BoxCommon';
import {Box} from '../../style/components/BoxForm';
import {ButtonS, TextareaAutosizeS, AlertS} from '../../style/components/material-ui';
import {Hr} from '../../style/components/decoration';
import ctx from '../../constants/ctx';
import {FormType, PathParams} from '../../constants/types';
import Loading from './Loading';

function Form({handleSubmit, placeholder, loginMessage, comment, loading}: FormType){
  const {walletAddr} = useContext(ctx);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleClick = async () => {
    await handleSubmit(inputValue); 
    setInputValue("");
  }

  const {pathBase} = useParams<PathParams>();

  return(
    walletAddr
    ? <Box style={comment ? {maxWidth: '550px', marginTop: '-10px'} : {}}>
        {loading && <Loading type='form' />}
        <Main style={loading ? {opacity: 0.5} : {}}>
          <LeftSide>
            <Link to={`/${pathBase}/profile/${walletAddr}`}>
              <Avatar>{walletAddr.slice(0,2)}</Avatar>
            </Link>
          </LeftSide>
          <RightSide>
            <TextareaAutosizeS
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
              disabled={loading}
            />
            <Hr />
            <ButtonS 
              variant="outlined"
              color="inherit"
              onClick={handleClick}
              style={{float: 'right'}}
              disabled={loading || !inputValue}
            >
              Toot!
            </ButtonS>
          </RightSide>
        </Main>
      </Box>
    : <AlertS severity="info" style={comment ? {maxWidth: '550px'} : {maxWidth: '600px'}}>
        {loginMessage}
      </AlertS>
  );
}

export default Form;