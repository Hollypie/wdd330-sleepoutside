import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { generateBreadcrumb } from "./breadcrumbs";

document.addEventListener("DOMContentLoaded", () => {
  generateBreadcrumb();
});

loadHeaderFooter().then(() => {
  setupSearchForm();

  const category = getParam("category")?.toLowerCase();
  const searchQuery = getParam("search")?.toLowerCase();
  const element = document.querySelector(".product-list");
  const titleElement = document.querySelector(".title");

  const dataSource = new ProductData();

  const productList = new ProductList(
    searchQuery || category || "All",
    {
      getData: async () => {
        let products = [];

        if (category) {
          products = await dataSource.getData(category);
        }

        if (searchQuery) {
          products = products.filter((product) =>
            product.Brand?.Name?.toLowerCase().includes(searchQuery),
          );
        }

        return products;
      },
    },
    element,
  );

  // Update title
  if (searchQuery && category) {
    titleElement.textContent = `Results for "${searchQuery}" in ${category}`;
  } else if (searchQuery) {
    titleElement.textContent = `Results for "${searchQuery}"`;
  } else {
    titleElement.textContent = category || "All Products";
  }

  productList.init();
});

// Search form handler
function setupSearchForm() {
  const form = document.getElementById("nav-search-form");
  const input = document.getElementById("nav-search-input");

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim();
      const currentCategory = getParam("category");

      if (query) {
        let url = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
        if (currentCategory) {
          url += `&category=${encodeURIComponent(currentCategory)}`;
        }
        window.location.href = url;
      }
    });
  }
}
