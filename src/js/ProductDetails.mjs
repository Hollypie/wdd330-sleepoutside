import { getLocalStorage, setLocalStorage, setClick, qs } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
  this.product = await this.dataSource.findProductById(this.productId);
  this.renderProductDetails();

  const addToCartButton = document.getElementById("add-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", this.addProductToCart.bind(this));
  }
}

  addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(this.product);
  setLocalStorage("so-cart", cartItems);

  // 👉 Animate the cart when a product is added
  const animatedCart = document.querySelector(".cart");
  if (animatedCart) {
    animatedCart.classList.remove("animate");
    void animatedCart.offsetWidth;
    animatedCart.classList.add("animate");
  }
}


  renderProductDetails() {
    document.querySelector("#product-details-container").innerHTML = productDetailsTemplate(this.product);
  }

}
function productDetailsTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercentage = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
      )
    : 0;

  const color = product.Colors && product.Colors.length > 0
    ? product.Colors[0].ColorName
    : "N/A";

  const priceHTML = isDiscounted
    ? `
      <span class="discounted-price">$${product.FinalPrice.toFixed(2)}</span>
      <span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      <span class="discount-badge">Save ${discountPercentage}%</span>
    `
    : `$${product.FinalPrice.toFixed(2)}`;

  return `
    <section class="product-detail">
      <h2 id="p-name">${product.Name}</h2>
      <p id="p-brand" class="detail__brand">${product.Brand.Name}</p>
      <img id="p-image" src="${product.Images.PrimaryExtraLarge}" alt="Image of ${product.Name}" />
      
      <p id="p-price" class="detail__price">${priceHTML}</p>
      <p id="p-color">Color: ${color}</p>
      <div id="p-description">${product.DescriptionHtmlSimple}</div>

      <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </section>
  `;
}

