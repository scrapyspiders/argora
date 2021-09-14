import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FormS, ButtonS} from "../../../style/components/Header";
import {PathParams, T_planet} from "../../../types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import Input from "./Input";
import { countPostsByPlanet } from "../../../api/arweave";
import { getVertoIDbyAddr, getVertoIDbyUsername, getVertoIDsuggestions } from "../../../utils";

let typingTimeout: any = null;

function Search({className}: {className?: string}) {
  const history = useHistory();
  const {pathBase, planet, addr} = useParams<PathParams>();
  const [value, setValue] = useState<string>("");
  const [showPostsN, setShowPostsN] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<T_planet[]>();
  const [is, setIs] = useState<string | null>(null);

  const postsNumber = async (planetName: string) => {
    if(planetName.length < 1)
      setShowPostsN(null);
    else{
      const result = await countPostsByPlanet(planetName);
      setShowPostsN(result);
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value.trimStart();
    setValue(val);

    const isAddr = /^[a-zA-Z0-9\-_]{43}$/.test(val.trim());
    const isVertoUsername = /^(@).*/.test(val);
    
    if(isAddr)
      setIs("profile");
    else if(isVertoUsername) {
      setIs("🧑‍💻 Verto ID");
      const vertoIDsuggestions = getVertoIDsuggestions(val.slice(1))?.map(user => '@' + user.username);
      setSuggestions(vertoIDsuggestions?.slice(0,10));
    }
    else setIs(null);
    
    if(typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => postsNumber(val), 300);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const submitted = value.trim();
    if(submitted.length > 0){
      if(/^[a-zA-Z0-9\-_]{43}$/.test(submitted))
        history.push(`/${pathBase}/profile/${submitted}`);
      else if(/^(@).*/.test(submitted)){
        const userVertoID = getVertoIDbyUsername(submitted.slice(1))
        if(userVertoID)
          history.push(`/${pathBase}/profile/${userVertoID.addresses[0]}`);
      }
      else
        history.push(`/${pathBase}/planet/${submitted}`);
    }
  }

  useEffect(() => {
    console.log("useEffect search");

    if(addr){
      const vertoID = getVertoIDbyAddr(addr);
      setValue(vertoID ? '@' + vertoID.username : addr);
      setIs(vertoID ? "🧑‍💻 Verto ID" : "profile");
    }
    else if(planet){
      setValue(planet);
      setIs("🪐 planet");
    }
    // The Metaweave
    else {
      setShowPostsN(null);
      setIs("search 🔎");
      setValue("");
    }

    const planetsListLocalStorage = localStorage.getItem('planets');
    setSuggestions(planetsListLocalStorage ? JSON.parse(planetsListLocalStorage) : []);
  }, [planet, addr]);

  return(
    <FormS onSubmit={handleSubmit} className={className}>
      <Input
        showInfo={is ? is : showPostsN}
        onChange={handleChange}
        value={value}
      />
      <datalist id="search">
        {suggestions?.map((p, i) => <option value={p} key={i} />)}
      </datalist>
      <ButtonS onClick={handleSubmit}>
        <FontAwesomeIcon icon={faRocket} />
      </ButtonS>
    </FormS>
  );
}

export default Search;