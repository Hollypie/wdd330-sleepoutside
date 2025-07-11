import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';

const category = 'tents';

const dataSource = new ProductData(category);

const listElement = document.querySelector('.product-list');

const tentList = new ProductList(category, dataSource, listElement);
tentList.init();
