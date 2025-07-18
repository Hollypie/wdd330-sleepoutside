import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter().then(() => {
  // 1. Get the product ID from the URL
  const productId = getParam("product");

  // 2. Create a data source for the product type (e.g., tents)
  const dataSource = new ProductData("tents");

  // 3. Create and initialize the product details view
  const product = new ProductDetails(productId, dataSource);
  product.init();

  const myButton = document.getElementById("addToCart");
  const animatedCart = document.querySelector(".cart");

  myButton.addEventListener("click", function () {
    animatedCart.classList.remove("animate");
    void animatedCart.offsetWidth;
    animatedCart.classList.add("animate");
  });
});
