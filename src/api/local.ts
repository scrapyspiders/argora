import { T_planet } from "../types";

const savePlanet = (planet: T_planet) => {
  console.log(planet);
  const planets = localStorage.getItem('planets');
  if(!planets)
    localStorage.setItem('planets', JSON.stringify([planet]));
  else{
    let updatedPlanets = JSON.parse(planets);
    if(updatedPlanets.indexOf(planet) === -1){
      updatedPlanets.push(planet);
      localStorage.setItem('planets', JSON.stringify(updatedPlanets));
    }
    console.log(updatedPlanets);
  }
};

export {savePlanet};