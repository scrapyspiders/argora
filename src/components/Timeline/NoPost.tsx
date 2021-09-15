import { useContext, useEffect, useState } from "react";
import { colors, img } from "../../constants";
import { NoPostImgS } from "../../style/components/decoration";
import { T_timeline } from "../../types";
import { ctx } from "../../utils";

function NoPost({type}: {type: T_timeline}){
  const {theme} = useContext(ctx);
  const [message, setMessage] = useState<string>();
  const [imageLight, setImageLight] = useState<string>();
  const [imageDark, setImageDark] = useState<string>();
  const [alt, setAlt] = useState<string>();
  
  useEffect(() => {
    console.log("useEffect NoPost");
    if(type === "main"){
      setMessage("Be the first to weeve on this planet.");
      setImageLight(img.emptyPlanetLight);
      setImageDark(img.emptyPlanetDark);
      setAlt("empty planet");
    }
    else if(type === "comments"){
      setMessage("No-one answered to this Weeve yet.");
      setAlt("no reply");
    }
    else if(type === "profile"){
      setMessage("This user never used Argora.");
      setAlt("empty profile");
    }
  }, [type]);

  return(
  <>
    <NoPostImgS src={theme ? imageLight : imageDark} alt={alt} />
    <div style={{
      color: colors.purple[1],
      textAlign: 'center',
      fontSize: 'larger',
      marginTop: '40px',
    }}>
      {message}
    </div>
  </>);
}

export default NoPost;