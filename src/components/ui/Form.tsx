import React, {useState, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Main, LeftSide, RightSide, Picture} from '../../style/components/BoxCommon';
import {Box, PictureCloseButton} from '../../style/components/BoxForm';
import {ButtonS, TextareaAutosizeS, AlertS, AvatarS, IconButtonS} from '../../style/components/material-ui';
import {Hr} from '../../style/components/decoration';
import {ctx, FormType, PathParams, FormPictureType} from '../../constants';
import Loading from './Loading';
import ImageIcon from '@material-ui/icons/Image';

function Form({handleSubmit, placeholder, loginMessage, comment, loading}: FormType){
  const {walletAddr} = useContext(ctx);
  const [inputValue, setInputValue] = useState<string>("");
  const [picture, setPicture] = useState<FormPictureType | null>(null);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleClick = async () => {
    await handleSubmit(inputValue, picture, () => {
      setInputValue("");
      setPicture(null);
    }); 
  }

  const handleChangePicture = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("handleChangePicture");
    const files = e.currentTarget.files;
    if(files && files.length > 0){
      setPicture({
        blobUrl: URL.createObjectURL(files[0]),
        type: files[0].type
      });
    }
    e.currentTarget.files = null;
  };

  const handlePictureClose = () => {
    setPicture(null);
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
            {picture && <Picture style={{
              backgroundImage: `url("${picture.blobUrl}")`
            }}>
              <PictureCloseButton onClick={handlePictureClose} />
            </Picture>}
            <Hr />
            <IconButtonS>
              <label style={{display: 'inherit', cursor: 'pointer'}}>
                <input hidden
                  type="file"
                  accept="image/*"
                  onChange={handleChangePicture}
                />
                <ImageIcon />
              </label>
            </IconButtonS>
            <ButtonS 
              variant="outlined"
              color="inherit"
              onClick={handleClick}
              style={{float: 'right'}}
              disabled={loading || (!inputValue && !picture)}
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