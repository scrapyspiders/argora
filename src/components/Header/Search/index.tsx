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
  const [planetTyped, setPlanetTyped] = useState<string>("");
  const [showPostsN, setShowPostsN] = useState<number | null>(null);
  const [planetsList, setPlanetsList] = useState<[T_planet]>();

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
    setPlanetTyped(val);
    
    if(typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => postsNumber(val), 300);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(planetTyped.length > 0){
      history.push(`/${pathBase}/${planetTyped}`);
    }
  }

  useEffect(() => {
    console.log("useEffect search");
    setShowPostsN(null);
    setPlanetTyped(planet ? planet : "");
    const planetsListLocalStorage = localStorage.getItem('planets');
    setPlanetsList(planetsListLocalStorage ? JSON.parse(planetsListLocalStorage) : []);
  }, [planet]);

  return(
    <FormS onSubmit={handleSubmit} className={className}>
      <Input
        showInfo={showPostsN}
        onChange={handleChange}
        value={planetTyped}
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