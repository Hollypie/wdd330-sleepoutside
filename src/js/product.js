import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Get the product ID from the URL
const productId = getParam("product");

// 2. Create a data source for the product type (e.g., tents)
const dataSource = new ProductData("tents");

// 3. Create and initialize the product details view
const product = new ProductDetails(productId, dataSource);
product.init();

// Optional: If you want to log the actual product (for debugging)
// dataSource.findProductById(productId).then(console.log);

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
