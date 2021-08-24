import { AvatarAnonymousS, BoxAnonymous, UserAddr } from "../../style/components/BoxProfile";
import { T_walletAddr } from "../../types";

function Anonymous({addr}: {addr: T_walletAddr}) {
  return(
    <BoxAnonymous>
      <AvatarAnonymousS>{addr.slice(0,2)}</AvatarAnonymousS>
      <div>
        <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
          {addr}
        </UserAddr>
      </div>
    </BoxAnonymous>
  );
}

export default Anonymous;