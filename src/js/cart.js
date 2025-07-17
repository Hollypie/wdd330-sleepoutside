import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  const cartListElement = document.querySelector(".product-list");
  const cart = new ShoppingCart(cartListElement);
  cart.init();
});
