import { Api } from "./components/base/Api";
import { APIManager } from "./components/communication/APIManager";
import { Buyer } from "./components/models/Buyer";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Сart";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

const productsCatalog = new Catalog();
productsCatalog.products = apiProducts.items;
console.log("Массив товаров из каталога: ", productsCatalog.products);

const firstId = productsCatalog.products[0]?.id;
console.log("Первый товар по id:", productsCatalog.getProductById(firstId));
productsCatalog.selectedProduct = productsCatalog.products[0];
console.log("Выбранный товар:", productsCatalog.selectedProduct);

const cart = new Cart();
console.log("Корзина при инициализации:", cart.products);

cart.addProduct(productsCatalog.products[0]);
console.log("После добавления товара:", cart.products);
console.log("Количество товаров в корзине:", cart.size);
console.log("Общая сумма корзины:", cart.total);
console.log("Есть ли товар с id", firstId, "?", cart.isExist(firstId));

cart.deleteProduct(firstId!);
console.log("После удаления товара:", cart.products);
console.log("Корзина пуста?", cart.size === 0);

const buyer = new Buyer(
  "card",
  "Ташкент, ул. Ленина, 1",
  "test@gmail.com",
  "+12345678"
);

console.log("Информация о пользователе:", buyer.userInfo);
console.log("Пользователь валиден?", buyer.isValid());

buyer.email = "new@mail.com";
console.log("После изменения email:", buyer.userInfo);

buyer.phone = "";
console.log("После изменения phone:", buyer.userInfo);
console.log("Пользователь валиден?", buyer.isValid());

buyer.clearInfo();
console.log("После очистки данных:", buyer.userInfo);
console.log("Пользователь валиден после очистки?", buyer.isValid());

const API = new Api(API_URL);
const apiManager = new APIManager(API);

const loadedProducts = await apiManager.fetchProducts();
productsCatalog.products = loadedProducts.items;
console.log("Массив товаров из API: ", productsCatalog.products);
