import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {InputS, FormS, ButtonS} from "../../style/components/Header";
import {PathParams} from "../../types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

function Search({className}: {className?: string}) {
  const history = useHistory();
  const {pathBase, planet} = useParams<PathParams>();
  const [planetTyped, setPlanetTyped] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPlanetTyped(e.currentTarget.value);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(planetTyped.length > 0){
      history.push(`/${pathBase}/${planetTyped}`);
      // setPlanetTyped("");
    }
  }

  useEffect(() => {
    // console.log("useEffect search");
    setPlanetTyped(planet ? planet : "");
  }, [planet]);

  return(
    <FormS onSubmit={handleSubmit} className={className}>
      <InputS
        onChange={handleChange}
        value={planetTyped}
        placeholder="Search a planet 🪐"
      />
      <ButtonS onClick={handleSubmit}>
        <FontAwesomeIcon icon={faRocket} />
      </ButtonS>
    </FormS>
  );
}

export default Search;