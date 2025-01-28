import { renderData } from "./renderData.js";

let currentPage = 1;
let currentID;

const goToPage = (url, id, page) => {
  console.log(url);

  currentPage = parseInt(page, 10);
  renderData(url, id);
};

const nextPage = (id, search) => {
  currentPage++;
  let url = `https://swapi.py4e.com/api/${id}/${search}&page=${currentPage}`;
  goToPage(url, id, currentPage);
};

const previousPage = (id, search) => {
  currentPage--;
  let url = `https://swapi.py4e.com/api/${id}/${search}&page=${currentPage}`;
  goToPage(url, id, currentPage);
};

const renderNextPage = (id, totalPages, search) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  button.classList.add("paginator__button", "paginator__button--next");
  button.innerText = "Next";
  button.addEventListener("click", () => {
    nextPage(id, search);
  });
  if (currentPage === totalPages) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }
  paginator.append(button);
};

const renderPreviousPage = (id, search) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  button.classList.add("paginator__button", "paginator__button--previous");
  button.innerText = "Previous";
  button.addEventListener("click", () => {
    previousPage(id, search);
  });

  if (currentPage === 1) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }
  paginator.append(button);
};

export const renderPageinator = (id, totalPages, search) => {
  if (currentID !== id) {
    currentPage = 1;
    currentID = id;
  }

  const content = document.querySelector(".content");
  const paginator = document.createElement("div");
  paginator.className = "paginator";
  content.append(paginator);
  let url = `https://swapi.py4e.com/api/${id}/${search}&page=`;

  renderPreviousPage(id, totalPages, search);

  for (let i = 0; i < totalPages; i++) {
    const button = document.createElement("button");
    button.className = "paginator__button";
    button.innerText = i + 1;
    button.dataset.page = i + 1;
    if (i + 1 === currentPage) {
      button.classList.add("paginator__button--active");
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const page = event.target.dataset.page;
      goToPage(`${url}${page}`, id, page);
    });
    paginator.append(button);
  }

  renderNextPage(id, totalPages, search);
};
