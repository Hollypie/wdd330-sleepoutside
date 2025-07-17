export function cartIconAnimationCallback() {
  const cartIcon = document.querySelector(".cart svg");
  if (cartIcon) {
    cartIcon.classList.add("animate");
  }
}

export function updateCartCountCallback() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const count = cartItems.length;
  const badge = document.querySelector("#cartCount");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "block" : "none";
  }
}
