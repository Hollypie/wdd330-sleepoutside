import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter, generateBreadcrumb } from "./utils.mjs";

generateBreadcrumb();
loadHeaderFooter().then(() => {
  const cartListElement = document.querySelector(".product-list");
  const cart = new ShoppingCart(cartListElement);
  cart.init();
});
