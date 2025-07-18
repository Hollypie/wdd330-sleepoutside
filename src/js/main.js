import { loadHeaderFooter, generateBreadcrumb} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

generateBreadcrumb();

loadHeaderFooter().then(() => {
  const dataSource = new ProductData("tents");
  const element = document.querySelector(".product-list");
  const productList = new ProductList("Tents", dataSource, element);

  productList.init();
});
