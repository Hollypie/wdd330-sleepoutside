import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button" data-id="${item.Id}" aria-label="Remove item">X</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartKey = "so-cart"; // LocalStorage key
  }

  init() {
    const cartItems = getLocalStorage(this.cartKey) || [];
    this.renderCart(cartItems);
    this.registerRemoveHandlers();
    this.displayTotal(cartItems);
  }

  renderCart(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
  }

  registerRemoveHandlers() {
    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemId = e.target.getAttribute("data-id");
        this.removeItem(itemId);
      });
    });
  }

  removeItem(itemId) {
    let cart = getLocalStorage(this.cartKey) || [];
    const index = cart.findIndex((item) => item.Id === itemId);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.init(); // Re-initialize to re-render and rebind
    }
  }

  displayTotal(cartItems) {
    const footer = document.querySelector(".cart-footer");
    const totalElement = document.querySelector(".cart-total");

    if (cartItems && cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + Number(item.FinalPrice),
        0
      );
      footer.classList.remove("hide");
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    } else {
      footer.classList.add("hide");
      totalElement.textContent = "Total: $0.00";
    }
  }
}
