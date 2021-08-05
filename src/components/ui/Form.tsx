import {useState, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Main, LeftSide, RightSide} from '../../style/components/BoxCommon';
import {Box} from '../../style/components/BoxForm';
import {ButtonS, TextareaAutosizeS, AlertS, AvatarS} from '../../style/components/material-ui';
import {Hr} from '../../style/components/decoration';
import {ctx, FormType, PathParams} from '../../constants';
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
              <AvatarS>{walletAddr.slice(0,2)}</AvatarS>
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
    : <AlertS severity="info" style={comment ? {maxWidth: '550px'} : {}}>
        {loginMessage}
      </AlertS>
  );
}

export default Form;