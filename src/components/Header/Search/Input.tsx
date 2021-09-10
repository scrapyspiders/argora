import { useEffect, useRef } from "react";
import { InfoS, InputLeftS, InputS } from "../../../style/components/Header";

const placeHolder = "search / create a planet 🪐";

function Input({showInfo, onChange, value}: {showInfo: boolean, onChange: (e: React.FormEvent<HTMLInputElement>) => void, value: string}){
  const didMount = useRef(false);
  const inputCropped = useRef<HTMLInputElement>(null);
  const inputOriginal = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(`useEffect Input - showInfo: ${showInfo}`);
    if(didMount.current){
      const cropped = inputCropped.current;
      const original = inputOriginal.current;
      cropped?.focus();
      original?.focus();
    }
    else didMount.current = true;
  }, [showInfo]);

  return(showInfo 
    ? <InputLeftS>
        <InfoS>21 weeves</InfoS>
        <InputS
          ref={inputCropped}
          className={showInfo ? "cropped" : undefined}
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
        />
      </InputLeftS>
    : <InputS
        ref={inputOriginal}
        className={showInfo ? "cropped" : undefined}
        onChange={onChange}
        value={value}
        placeholder={placeHolder}
      />
  );
}

export default Input;