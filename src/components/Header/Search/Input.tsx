import { useEffect, useRef } from "react";
import { InfoS, InputLeftS, InputS } from "../../../style/components/Header";

const placeHolder = "search / create a planet 🪐 or search a wallet";

function Input({showInfo, onChange, value}: {showInfo: string | number | null, onChange: (e: React.FormEvent<HTMLInputElement>) => void, value: string}){
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

  return(showInfo !== null
    ? <InputLeftS>
        
        <InfoS>{
          Number.isInteger(showInfo) 
          ? showInfo > 0
            ? `${showInfo} weeve${showInfo > 1 ? 's' : ''}`
            : "NEW"
          : showInfo}
        </InfoS>
        <InputS
          list="search"
          ref={inputCropped}
          className={showInfo !== null ? "cropped" : undefined}
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
        />
      </InputLeftS>
    : <InputS
        list="search"
        ref={inputOriginal}
        className={showInfo !== null ? "cropped" : undefined}
        onChange={onChange}
        value={value}
        placeholder={placeHolder}
      />
  );
}

export default Input;