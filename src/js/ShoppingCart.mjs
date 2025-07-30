import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || "N/A";
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimaryMedium || "/images/fallback.jpg"}" alt="${item.NameWithoutBrand || item.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.NameWithoutBrand || item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">
      <button class="qty-button decrease" data-id="${item.Id}" aria-label="Decrease quantity">−</button>
      <span class="qty-display">Quantity: ${item.quantity || 1}</span>
      <button class="qty-button increase" data-id="${item.Id}" aria-label="Increase quantity">+</button>
    </p>
    <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
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
  this.listElement.addEventListener("click", (e) => {
    const itemId = e.target.dataset.id;

    if (e.target.classList.contains("remove-button")) {
      this.removeItem(itemId);
    }

    if (e.target.classList.contains("increase")) {
      this.changeQuantity(itemId, 1);
    }

    if (e.target.classList.contains("decrease")) {
      this.changeQuantity(itemId, -1);
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
    const total = cartItems.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + (Number(item.FinalPrice) * quantity);
    }, 0);

    footer.classList.remove("hide");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
    totalElement.textContent = "Total: $0.00";
  }
}

  changeQuantity(itemId, delta) {
    const cart = getLocalStorage(this.cartKey) || [];
    const itemIndex = cart.findIndex(item => item.Id === itemId);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + delta;

      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1); // Remove item if quantity is 0 or less
      }

      setLocalStorage(this.cartKey, cart);
      this.renderCart(cart);
      this.displayTotal(cart);
    }
  }
}
