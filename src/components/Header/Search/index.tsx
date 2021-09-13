import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FormS, ButtonS} from "../../../style/components/Header";
import {PathParams, T_planet} from "../../../types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import Input from "./Input";
import { countPostsByPlanet } from "../../../api/arweave";

let typingTimeout: any = null;

function Search({className}: {className?: string}) {
  const history = useHistory();
  const {pathBase, planet} = useParams<PathParams>();
  const [value, setValue] = useState<string>("");
  const [showPostsN, setShowPostsN] = useState<number | null>(null);
  const [planetsList, setPlanetsList] = useState<[T_planet]>();
  const [isProfile, setIsProfile] = useState(false);

  const postsNumber = async (planetName: string) => {
    if(planetName.length < 1)
      setShowPostsN(null);
    else{
      const result = await countPostsByPlanet(planetName);
      setShowPostsN(result);
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setValue(val);

    const isAddr = /^[a-zA-Z0-9\-_]{43}$/.test(val);
    isAddr ? setIsProfile(true) : setIsProfile(false);
    
    if(typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => postsNumber(val), 300);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(value.length > 0){
      history.push(/^[a-zA-Z0-9\-_]{43}$/.test(value) ? `/${pathBase}/profile/${value}` : `/${pathBase}/${value}`);
    }
  }

  useEffect(() => {
    console.log("useEffect search");
    setShowPostsN(null);
    setValue(planet ? planet : "");
    const planetsListLocalStorage = localStorage.getItem('planets');
    setPlanetsList(planetsListLocalStorage ? JSON.parse(planetsListLocalStorage) : []);
  }, [planet]);

  return(
    <FormS onSubmit={handleSubmit} className={className}>
      <Input
        showInfo={isProfile ? "profile" : showPostsN}
        onChange={handleChange}
        value={value}
      />
      <datalist id="search">
        {planetsList?.map((p, i) => <option value={p} key={i} />)}
      </datalist>
      <ButtonS onClick={handleSubmit}>
        <FontAwesomeIcon icon={faRocket} />
      </ButtonS>
    </FormS>
  );
}

export default Search;