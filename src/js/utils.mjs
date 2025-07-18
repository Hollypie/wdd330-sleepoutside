import { updateCartCountCallback } from "./headerCallbacks";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function loadHeaderFooter() {
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  const headerPromise = loadTemplate("/partials/header.html").then((template) => {
    renderWithTemplate(template, headerElement, null, updateCartCountCallback);
  });

  const footerPromise = loadTemplate("/partials/footer.html").then((template) => {
    renderWithTemplate(template, footerElement);
  });

  return Promise.all([headerPromise, footerPromise]);
}

export function generateBreadcrumb() {
  const breadcrumb = document.querySelector("nav.breadcrumb");
  if (!breadcrumb) return;

  const path = window.location.pathname;

  const isHome =
    path === "/" ||
    path.endsWith("index.html") &&
    path.includes("/src/") &&
    !path.includes("/cart/") &&
    !path.includes("/checkout/") &&
    !path.includes("/product_listing/") &&
    !path.includes("/product_pages/");

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

  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartCount = cartItems.length;

  if (isProductListPage && category) {
    const products = JSON.parse(localStorage.getItem("product-list")) || [];
    breadcrumb.innerHTML = `
      <a href="/">Home</a> &gt; ${capitalizedCategory} → (${products.length} items)
    `;
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
  } else {
    // Fallback breadcrumb
    breadcrumb.innerHTML = `<a href="/">Home</a>`;
  }

  breadcrumb.style.display = "block";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
