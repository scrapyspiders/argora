import { useParams } from "react-router-dom";
import { C_replyToRootName } from "../constants";
import { PathParams } from "../types";
import Timeline from "./Timeline";

function Planet(){
  const {pathBase, planet} = useParams<PathParams>();

  return (<Timeline type="main" txid={C_replyToRootName} planetName={planet} />);
}

export default Planet;