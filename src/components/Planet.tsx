import { C_replyToRootName } from "../constants";
import Timeline from "./Timeline";

function Planet(){
  return (<Timeline type="main" txid={C_replyToRootName} />);
}

export default Planet;