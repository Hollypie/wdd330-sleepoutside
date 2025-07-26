import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import { generateBreadcrumb } from "./breadcrumbs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", generateBreadcrumb);

loadHeaderFooter().then(() => {
  const order = new CheckoutProcess("so-cart", ".checkout-summary");
  order.init();

  document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

  const form = document.forms["checkout"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = [];

    // Format checks
    const cardNumber = form.cardNumber.value.trim().replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(cardNumber)) {
      errors.push("Invalid card number. Must be 13–19 digits.");
    }

    const expiration = form.expiration.value.trim();
    if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(expiration)) {
      errors.push("Invalid expiration date. Use MM/YY or MM/YYYY.");
    }

    const cvv = form.code.value.trim();
    if (!/^\d{3,4}$/.test(cvv)) {
      errors.push("Invalid CVV. Must be 3 or 4 digits.");
    }

    if (errors.length > 0) {
      errors.forEach((msg, index) => {
        // Delay each alert slightly so they don't all fire at once
        setTimeout(() => alertMessage(msg, index === 0), index * 100);
      });
      return;
    }

    // All passed
    order.checkout();
  });
});
