import {
  loadHeaderFooter,
  loadTemplate,
  renderWithTemplate,
} from "./utils.mjs";
import {
  cartIconAnimationCallback,
  updateCartCountCallback,
} from "./headerCallbacks";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();
const headerElement = document.querySelector("#main-header");
const path = window.location.pathname;

function getHeaderCallback(currentPath) {
  if (currentPath.includes("/product-pages/")) return cartIconAnimationCallback;
  if (currentPath.includes("/cart/")) return updateCartCountCallback;
  return null; // index.html or other static pages
}

loadTemplate("/partials/header.html").then((template) => {
  const callback = getHeaderCallback(path);
  renderWithTemplate(template, headerElement, null, callback);
});

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();
