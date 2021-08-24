import { useParams } from "react-router-dom";
import { UserAddrLink, UserVertoName } from "../../style/components/BoxPost";
import { PathParams, T_walletAddr, T_userVertoID } from "../../types";

function Username({addr, vertoID}: {addr: T_walletAddr, vertoID: T_userVertoID | null}){
  const {pathBase} = useParams<PathParams>();

  return(<>
    {vertoID && <UserVertoName>{vertoID.name}</UserVertoName>}
    <UserAddrLink to={`/${pathBase}/profile/${addr}`}>
      {vertoID ? '@' + vertoID.username : `${addr?.slice(0,5)}...${addr?.slice(addr?.length-5, addr?.length)}`}
    </UserAddrLink>
  </>);
}

export default Username;