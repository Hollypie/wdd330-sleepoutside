// Add HTML element to cart page to hold the total. Add a class and CSS to hide the element by default. We can use this same element later to also hold the Checkout button when we add that functionality. So something like to following might be appropriate: <div class="cart-footer hide"><p class="cart-total">Total: </p></div>

// When the cart page loads, and after it has pulled any cart items from local storage check to see if there is anything in the cart

// If there are items in the cart, show the html element added above, then calculate the total of the items, create some HTML to display it ($${total}) and insert it into the element.

import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // Add event listeners to all remove buttons
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.getAttribute("data-id");
      removeItemFromCart(itemId);
    });
  });

  displayTotal();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-button" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

renderCartContents();

function removeItemFromCart(itemId) {
  let cart = getLocalStorage("so-cart");

  // Find index of the first item with matching Id
  const index = cart.findIndex((item) => item.Id === itemId);

  if (index !== -1) {
    cart.splice(index, 1); // Remove just one occurrence
    localStorage.setItem("so-cart", JSON.stringify(cart));
    renderCartContents(); // Re-render cart
  }
}

function displayTotal() {
  const cartItems = getLocalStorage("so-cart");
  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (cartItems && cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0,
    );
    footer.classList.remove("hide");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    // Hide footer and clear total
    footer.classList.add("hide");
    totalElement.textContent = "Total: $0.00";
  }
}
