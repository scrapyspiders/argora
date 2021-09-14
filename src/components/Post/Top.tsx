import { Link, useParams } from "react-router-dom";
import { C_replyToProfileName, C_replyToRootName } from "../../constants";
import { TopS } from "../../style/components/BoxPost";
import { PathParams, T_planet, T_replyToProfileName, T_replyToRootName, T_txid } from "../../types";

function Top({replyTo, planet}: {replyTo?: T_txid | T_replyToRootName | T_replyToProfileName, planet?: T_planet}){
  const {pathBase} = useParams<PathParams>();

  const isReply = replyTo && ![C_replyToRootName, C_replyToProfileName].includes(replyTo);

  return(
    isReply || planet ? 
    <TopS>
      {isReply && replyTo &&
      <>
        Replied to <Link to={`/${pathBase}/thread/${replyTo}`}>{replyTo.slice(0,10)}...{replyTo.slice(replyTo.length-10, replyTo.length)}</Link>{' '}
      </>}
      {planet &&
      <>
        {isReply ? 'f' : 'F'}rom planet <Link to={`/${pathBase}/planet/${planet}`}>🪐 {planet}</Link>
      </>}
    </TopS>
    : <></>
  );
}

export default Top;