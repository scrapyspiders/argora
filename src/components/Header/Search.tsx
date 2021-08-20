import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {InputS, FormS, ButtonS} from "../../style/components/Header";
import {PathParams} from "../../types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

function Search() {
  const history = useHistory();
  const {pathBase} = useParams<PathParams>();
  const [planet, setPlanet] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPlanet(e.currentTarget.value);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(planet.length > 0){
      history.push(`/${pathBase}/${planet}`);
      setPlanet("");
    }
  }

  return(
    <FormS onSubmit={handleSubmit}>
      <InputS
        onChange={handleChange}
        value={planet}
        placeholder="Search a planet"
      />
      <ButtonS onClick={handleSubmit}>
        <FontAwesomeIcon icon={faRocket} />
      </ButtonS>
    </FormS>
  );
}

export default Search;