import { sortData, clearContent, toggleLoading, cachedData } from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

export const renderPlanets = async () => {
  //Clear the content of the app
  clearContent();

  const endpoint = "planets";
  const app = document.querySelector(".content");

  //Check if the data is already cached
  let planetsData;

  //If the data is not cached, fetch the data from the Star Wars API
  if (!cachedData[endpoint]) {
    planetsData = await getStarWarsData(endpoint);
    //else use the cached data
  } else {
    planetsData = cachedData[endpoint];
  }

  const planetsResults = sortData(planetsData.results);

  const planetContainer = document.createElement("div");
  planetContainer.className = "planet-container";

  for (const planet of planetsResults) {
    //------------------------//
    //Create card elements
    //------------------------//
    const planetCard = document.createElement("div");
    const name = document.createElement("p");
    const population = document.createElement("p");

    //------------------------//
    //Adding classes
    //------------------------//
    planetCard.className = "card";
    name.className = "planet-card__name";
    population.className = "planet-card__population";

    //------------------------//
    //Adding text content
    //------------------------//
    if (planet.name) {
      name.innerHTML = planet.name;
    }
    population.innerText = `Population: ${planet.population}`;

    //Append the card elements to the card
    planetCard.append(name, population);

    for (const resident of planet.residents) {
      const residentData = (await getSubData(resident)) || "Unknown";
      const residentName = document.createElement("p");
      residentName.innerText = residentData.name;
      planetCard.append(residentName);
    }

    planetContainer.append(planetCard);
  }
  app.append(planetContainer);
};
