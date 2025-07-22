import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { generateBreadcrumb } from "./breadcrumbs";

document.addEventListener("DOMContentLoaded", generateBreadcrumb);

loadHeaderFooter().then(async () => {
  const productId = getParam("product");
  const dataSource = new ExternalServices();
  const product = new ProductDetails(productId, dataSource);
  await product.init();
});
