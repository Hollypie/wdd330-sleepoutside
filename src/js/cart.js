import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { generateBreadcrumb } from "./breadcrumbs";

document.addEventListener("DOMContentLoaded", generateBreadcrumb);

loadHeaderFooter().then(() => {
  const cartListElement = document.querySelector(".product-list");
  const cart = new ShoppingCart(cartListElement);
  cart.init();

  const button = document.getElementById("checkout-button");
  if (button) {
    button.addEventListener("click", () => {
      window.location.href = "/checkout/index.html";
    });
  }
});
