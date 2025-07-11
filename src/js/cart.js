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
