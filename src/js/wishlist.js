import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";
import { generateBreadcrumb } from "./breadcrumbs.js";

loadHeaderFooter().then(() => {
  generateBreadcrumb();
  const wishlist = getLocalStorage("so-wishlist") || [];
  const container = document.getElementById("wishlist-container");

  function renderWishlist() {
    if (!wishlist.length) {
      container.innerHTML = "<p>Your wishlist is empty.</p>";
      return;
    }

    container.innerHTML = wishlist
      .map(
        (item, index) => `
        <div class="wishlist-item">
          <img src="${item.Images.PrimaryMedium}" alt="Image of ${item.Name}" />
          <h2>${item.Brand.Name}</h2>
          <h3>${item.NameWithoutBrand}</h3>
          <p>$${item.FinalPrice.toFixed(2)}</p>
          <button data-index="${index}" class="move-to-cart">Move to Cart</button>
        </div>`,
      )
      .join("");

    document.querySelectorAll(".move-to-cart").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        moveToCart(index);
      }),
    );
  }

  function moveToCart(index) {
    const item = wishlist.splice(index, 1)[0];
    const cart = getLocalStorage("so-cart") || [];
    cart.push(item);
    setLocalStorage("so-cart", cart);
    setLocalStorage("so-wishlist", wishlist);
    renderWishlist();
  }

  renderWishlist();
});
