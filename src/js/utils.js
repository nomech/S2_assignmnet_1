import { getStarWarsData, getSubData } from "./dataFetchers.js";

export const imageLibrary = {
  people: {
    1: "./src/assets/images/LukeSkywalker.webp",
    2: "./src/assets/images/C3PO.webp",
    3: "./src/assets/images/R2D2.webp",
    4: "./src/assets/images/darthVader.webp",
    5: "./src/assets/images/leiaOrgana.webp",
    6: "./src/assets/images/OwenLars.webp",
    7: "./src/assets/images/BeruWhitesunLars.webp",
    8: "./src/assets/images/R5D4.webp",
    9: "./src/assets/images/BiggsDarklighter.webp",
    10: "./src/assets/images/obiWanKenobi.webp",
  },
  planets: {
    1: "./src/assets/images/tatooine.webp",
    2: "./src/assets/images/alderaan.webp",
    3: "./src/assets/images/yavinIV.webp",
    4: "./src/assets/images/hoth.webp",
    5: "./src/assets/images/dagobah.webp",
    6: "./src/assets/images/bespin.webp",
    7: "./src/assets/images/endor.webp",
    8: "./src/assets/images/naboo.webp",
    9: "./src/assets/images/coruscant.webp",
    10: "./src/assets/images/kamino.webp",
  },
  films: {
    1: "./src/assets/images/episode4.webp",
    2: "./src/assets/images/episode5.webp",
    3: "./src/assets/images/episode6.webp",
    4: "./src/assets/images/episode1.webp",
    5: "./src/assets/images/episode2.webp",
    6: "./src/assets/images/episode3.webp",
    7: "./src/assets/images/episode7.webp",
  },
  vehicles: {
    4: "./src/assets/images/sandcrawler.webp",
    6: "./src/assets/images/t16.webp",
    7: "./src/assets/images/x34.webp",
    8: "./src/assets/images/tiefighter.webp",
    14: "./src/assets/images/snowspeeder.webp",
    16: "./src/assets/images/tiebomber.webp",
    18: "./src/assets/images/atat.webp",
    19: "./src/assets/images/atst.webp",
    20: "./src/assets/images/cloudcar.webp",
    24: "./src/assets/images/sailbarge.webp",
  },
  placeholder: "./src/assets/images/placeholder.webp",
};

//Sorts the data fetched from the Star Wars API
export const sortData = (dataArray) => {
  const sortedData = dataArray.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sortedData;
};

export const sortDataByEpisode = (dataArray) => {
  const sortedData = dataArray.sort((a, b) => {
    return a.episode_id - b.episode_id;
  });

  return sortedData;
};

//Fetches data from the Star Wars API
export const clearContent = () => {
  const content = document.querySelector(".content");
  content.innerHTML = "";
};

// Create a paragraph element for each key-value pair in the data
export const createInfo = (data, parent) => {
  for (const result of data.results) {
    for (const key in result) {
      const info = document.createElement("p");
      info.innerText = `${key}: ${result[key]}`;
      parent.append(info);
    }
  }
};

//Toggle the loading spinner
export const toggleLoading = (loading) => {
  const loadingElement = document.querySelector(".loading");
  if (loading) {
    loadingElement.classList.add("loading--show");
  } else {
    loadingElement.classList.remove("loading--show");
  }
};

export const appendSubDataName = async (array) => {
  if (array.length === 0) {
    return;
  }
  const list = document.createElement("ul");
  list.className = "data-card__list";
  for (const item of array) {
    const data = await getSubData(item);
    const listItem = document.createElement("li");
    const name = data.name || data.title;

    listItem.dataset.url = item;
    listItem.innerText = `${name}`;

    list.append(listItem);
  }
  return list;
};

/* export const renderSpecificItem = async (url) => {
  clearContent();
  toggleLoading(true);
  const content = document.querySelector(".content");
  const data = await getStarWarsData(url);
  const dataContainer = document.createElement("div");

  for (const key in data) {
    if (key === "url") {
      continue;
    }

    const info = document.createElement("p");
    if (Array.isArray(data[key])) {
      if (data[key].length > 0) {
        const list = document.createElement("ul");
        list.className = "data-card__list";

        for (const item of data[key]) {
          const subData = await getSubData(item);
          const listItem = document.createElement("li");
          listItem.innerText = subData.name || subData.title;
          list.append(listItem);
          dataContainer.append(list);
        }
      }
      //check if value is a url
    } else if (data[key].toString().includes("https://")) {
      const subData = await getSubData(data[key]);
      info.innerText = `${key}: ${subData.name || subData.title}`;
      dataContainer.append(info);
    } else {
      info.innerText = `${key.replaceAll("_", " ")}: ${data[key]}`;
      dataContainer.append(info);
    }
  }
  toggleLoading();
  content.append(dataContainer);
}; */

export const numberFormatter = (number) => {
  return !isNaN(parseInt(number))
    ? parseInt(number).toLocaleString()
    : "Unknown";
};
