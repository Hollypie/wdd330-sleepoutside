import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { generateBreadcrumb } from "./breadcrumbs";

generateBreadcrumb();

loadHeaderFooter().then(() => {
  const cartListElement = document.querySelector(".product-list");
  const cart = new ShoppingCart(cartListElement);
  cart.init();
});
