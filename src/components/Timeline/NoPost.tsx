import { colors } from "../../constants";
import { T_timeline } from "../../types";

function NoPost({type}: {type: T_timeline}){
  const message = type === "main" 
    ? "Be the first to weeve on this planet." :
    type === "comments" ? "No-one answered to this Weeve yet."
    : "";

  return(
  <div style={{
    color: colors.purple[1],
    textAlign: 'center',
    fontSize: 'larger',
    marginTop: '40px',
  }}>
    {message}
  </div>);
}

export default NoPost;