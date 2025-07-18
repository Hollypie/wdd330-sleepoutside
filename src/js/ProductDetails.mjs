import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  const usdPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(product.FinalPrice));

  document.querySelector("#p-price").textContent = `${usdPrice}`;
  document.querySelector("#p-color").textContent =
    product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;

  // Optional: If you want to show discount logic, add this inside the function
  const priceElement = document.querySelector("#p-price");
  if (
    product.SuggestedRetailPrice &&
    product.FinalPrice < product.SuggestedRetailPrice
  ) {
    const discountPercentage = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100
    );
    priceElement.innerHTML = `
      <span class="discounted-price">$${product.FinalPrice.toFixed(2)}</span>
      <span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      <span class="discount-badge">Save ${discountPercentage}%</span>
    `;
  } else {
    priceElement.textContent = `$${product.FinalPrice.toFixed(2)}`;
  }
}
