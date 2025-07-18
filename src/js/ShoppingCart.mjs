import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || "N/A";
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button" data-id="${item.Id}" aria-label="Remove item">X</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartKey = "so-cart";
  }

  init() {
    const cartItems = getLocalStorage(this.cartKey) || [];
    this.renderCart(cartItems);
    this.displayTotal(cartItems);
    this.registerRemoveHandlers(); // Moved after DOM is rendered
  }

  renderCart(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, "afterbegin", true);
  }

  registerRemoveHandlers() {
    // Use event delegation for better reliability
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-button")) {
        const itemId = e.target.dataset.id;
        this.removeItem(itemId);
      }
    });
  }

  removeItem(itemId) {
    let cart = getLocalStorage(this.cartKey) || [];
    const index = cart.findIndex(item => item.Id === itemId);
    if (index !== -1) {
      cart.splice(index, 1);  // remove one occurrence only
      setLocalStorage(this.cartKey, cart);
      this.renderCart(cart);
      this.displayTotal(cart);
    }
  }


  displayTotal(cartItems) {
    const footer = document.querySelector(".cart-footer");
    const totalElement = document.querySelector(".cart-total");

    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
      footer.classList.remove("hide");
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    } else {
      footer.classList.add("hide");
      totalElement.textContent = "Total: $0.00";
    }
  }
}
