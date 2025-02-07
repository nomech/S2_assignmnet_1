import { renderNavButtons } from "./renderNavButtons.js";
import { renderData } from "./renderData.js";
import { renderSearch } from "./search.js";
import { globalValues, clearContent } from "./utils.js";

window.addEventListener("DOMContentLoaded", async () => {
  const categories = await renderNavButtons();
  const content = document.querySelector(".content");
  const intro = document.querySelector(".intro");

  content.append(renderSearch(categories));

  document.addEventListener("click", (event) => {
    const classList = event.target.classList;
    if (classList.contains("nav-button")) {
      const id = event.target.dataset.id;
      const url = event.target.dataset.url;

      if (id === "home") {
        intro.classList.remove("intro--hide");
        clearContent();
        content.append(renderSearch(categories));
        return;
      }

      intro.classList.contains("intro--hide")
        ? null
        : intro.classList.add("intro--hide");

      globalValues.currentPage = 1;
      globalValues.search = false;
      content.classList.remove("content--limited");
      renderData(url, id);
    } else if (classList.contains("nav__menu")) {
      const nav = document.querySelector(".nav");
      nav.classList.toggle("nav--open");
    }
  });
});
