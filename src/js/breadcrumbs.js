export function generateBreadcrumb() {
  const breadcrumb = document.querySelector("nav.breadcrumb");
  if (!breadcrumb) return;

  const path = window.location.pathname;

  const isHome =
    path === "/" ||
    (path.endsWith("index.html") &&
      path.includes("/src/") &&
      !path.includes("/cart/") &&
      !path.includes("/checkout/") &&
      !path.includes("/product_listing/") &&
      !path.includes("/wishlist/") &&
      !path.includes("/product_pages/"));

  if (isHome) {
    breadcrumb.innerHTML = "";
    breadcrumb.style.display = "none";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const capitalizedCategory = category ? capitalize(category) : "";
  const isProductListPage = path.includes("/product_listing/");
  const isProductDetailPage = path.includes("/product_pages/");
  const isCartPage = path.includes("/cart/");
  const isCheckoutPage = path.includes("/checkout/");
  const isWishListPage = path.includes("/wishlist/");

  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartCount = cartItems.length;

  if (isProductListPage && category) {
    setTimeout(() => {
      const productCards = document.querySelectorAll(".product-card");
      breadcrumb.innerHTML = `
      <a href="/">Home</a> &gt; ${capitalizedCategory} → (${productCards.length} items)
    `;
      breadcrumb.style.display = "block";
    }, 500);
  } else if (isProductDetailPage && category) {
    breadcrumb.innerHTML = `
      <a href="/">Home</a> &gt; <a href="/product_listing/index.html?category=${category}">${capitalizedCategory}</a> &gt; Product Details
    `;
  } else if (isCartPage) {
    breadcrumb.innerHTML = `
      <a href="/">Home</a> &gt; Cart (${cartCount} item${cartCount !== 1 ? "s" : ""})
    `;
  } else if (isCheckoutPage) {
    breadcrumb.innerHTML = `
      <a href="/">Home</a> &gt; <a href="/cart/index.html">Cart</a> &gt; Checkout (${cartCount} item${cartCount !== 1 ? "s" : ""})
    `;
  } else if (isWishListPage) {
    breadcrumb.innerHTML = `
      <a href="/">Home</a> &gt; Wishlist
  `;
  } else {
    // Fallback breadcrumb
    breadcrumb.innerHTML = `<a href="/">Home</a>`;
  }

  breadcrumb.style.display = "block";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
