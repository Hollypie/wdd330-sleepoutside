import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { generateBreadcrumb } from "./breadcrumbs";

document.addEventListener("DOMContentLoaded", generateBreadcrumb);

loadHeaderFooter().then(() => {
  // Get the category from the query string (e.g., ?category=Tents)
  const category = getParam("category");

  // Use the category to create the data source and product list
  const dataSource = new ProductData(category?.toLowerCase()); // make it lowercase if needed
  const element = document.querySelector(".product-list");
  const productList = new ProductList(category, dataSource, element);

  productList.init();
});
