import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { generateBreadcrumb } from "./breadcrumbs";

generateBreadcrumb();

loadHeaderFooter().then(async () => {
  const productId = getParam("product");
  const dataSource = new ProductData();
  const product = new ProductDetails(productId, dataSource);
  await product.init();
});
