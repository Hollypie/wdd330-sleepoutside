import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product
    this.renderProductDetails();

    // Add to cart listener
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
    const template = document.getElementById("product-listitem");
    const productList = document.getElementById("product-list");

    const clone = template.content.cloneNode(true);
    const [listItem, url, img, brand, name, price] =
      clone.querySelectorAll("li, a, img, h3, h2, p");

    url.href = `product_pages/index.html?product=${this.product.Id}`;
    img.src = this.product.Image;
    img.alt = this.product.Name;
    brand.textContent = this.product.Brand?.Name ?? "Unknown Brand";
    name.textContent = this.product.NameWithoutBrand;
    price.textContent = `$${this.product.FinalPrice}`;

    productList.appendChild(clone);
  }
}
