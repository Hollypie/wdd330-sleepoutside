import { loadHeaderFooter } from "./utils.mjs";
import { generateBreadcrumb } from "./breadcrumbs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", generateBreadcrumb);

loadHeaderFooter().then(() => {
  const order = new CheckoutProcess("so-cart", ".checkout-summary");
  order.init();

  // Add event listeners to fire calculateOrderTotal when the user changes the zip code
  document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

  // Handle form submission with validation
  const form = document.forms["checkout"];
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = form.checkValidity();
    form.reportValidity();

    if (isValid) {
      order.checkout();
    }
  });
});
