import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter().then(() => {
  const category = getParam("category");

  const dataSource = new ExternalServices(category?.toLowerCase());
  const element = document.querySelector(".product-list");
  const productList = new ProductList(
    category?.toLowerCase(),
    dataSource,
    element,
  );

  productList.init();
});
