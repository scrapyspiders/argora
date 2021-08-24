import React, {useState, useContext, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Main, LeftSide, RightSide, PictureS} from '../../../style/components/BoxCommon';
import {Box, PictureCloseButton} from '../../../style/components/BoxForm';
import {ButtonS, TextareaAutosizeS, AlertS, AvatarS, IconButtonS} from '../../../style/components/material-ui';
import {Hr} from '../../../style/components/decoration';
import {ctx, getVertoID} from '../../../utils';
import {PathParams, FormType, FormPictureType, T_userVertoID} from '../../../types';
import Loading from '../../ui/Loading';
import ImageIcon from '@material-ui/icons/Image';

function Form({handleSubmit, type, loading}: FormType){
  const {walletAddr} = useContext(ctx);
  const [inputValue, setInputValue] = useState<string>("");
  const [picture, setPicture] = useState<FormPictureType | null>(null);
  const [fontSize, setFontSize] = useState<string>("larger");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");

  const [vertoID, setVertoID] = useState<T_userVertoID | null>(null);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    if(e.currentTarget.value.length < 200)
      setFontSize("larger");
    else
      setFontSize("medium");
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

  useEffect(() => {
    switch (type) {
      case "main":
        setPlaceholder("What's happening?");
        setLoginMessage("Wanna weeve something to the world? Please log in.");
        break;
      case "comments":
        setPlaceholder("Weeve your reply!");
        setLoginMessage("Wanna reply to this? Please log in.");
        break;
      case "profile":
        setPlaceholder("Add a status on your profile");
    }
  }, [setPlaceholder, setLoginMessage, type]);

  useEffect(() => {
    setVertoID(() => getVertoID(walletAddr));
  },[walletAddr]);

  const {pathBase} = useParams<PathParams>();

  return(
    walletAddr
    ? <Box style={type === "comments" ? {maxWidth: '550px', marginTop: '-10px'} : {}}>
        {loading && <Loading type='form' />}
        <Main style={loading ? {opacity: 0.5} : {}}>
          <LeftSide>
            <Link to={`/${pathBase}/profile/${walletAddr}`}>
              {vertoID && vertoID.image 
              ? <AvatarS src={`https://arweave.net/${vertoID.image}`} />
              : <AvatarS>
                  {vertoID ? vertoID.username.slice(0,2) : walletAddr.slice(0,2)}
                </AvatarS>}
            </Link>
          </LeftSide>
          <RightSide>
            {picture && <PictureS style={{
              backgroundImage: `url("${picture.blobUrl}")`
            }}>
              <PictureCloseButton onClick={handlePictureClose} />
            </PictureS>}
            <TextareaAutosizeS
              style={{fontSize: fontSize}}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
              disabled={loading}
            />
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
              Weeve!
            </ButtonS>
          </RightSide>
        </Main>
      </Box>
    : <AlertS severity="info" style={type === "comments" ? {maxWidth: '550px'} : {}}>
        {loginMessage}
      </AlertS>
  );
}

export default Form;