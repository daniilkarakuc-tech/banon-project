// Студент: Каракуц Даниїл Олександрович
// Група: ФІТ 4-1

// === ТОВАРИ ===
const PRODUCTS = [
  { id: "p1", name: "Пральний порошок 3 кг", price: 7.99, category: "Прання" },
  { id: "p2", name: "Засіб для миття посуду 1 л", price: 2.49, category: "Кухня" },
  { id: "p3", name: "Губки кухонні (10 шт)", price: 1.29, category: "Кухня" },
  { id: "p4", name: "Пакети для сміття (30 шт)", price: 1.99, category: "Дім" },
  { id: "p5", name: "Засіб для миття вікон 500 мл", price: 2.19, category: "Прибирання" },
  { id: "p6", name: "Серветки з мікрофібри (3 шт)", price: 3.49, category: "Прибирання" },
  { id: "p7", name: "Освіжувач повітря", price: 2.79, category: "Дім" },
  { id: "p8", name: "Господарські рукавички", price: 1.59, category: "Прибирання" }
];

// === КОШИК ===
const CART_KEY = "exam_cart_fit41";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || {};
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  updateCartBadge();
  alert("Товар додано до кошика");
}

function cartTotals() {
  const cart = getCart();
  let qty = 0;
  let sum = 0;

  for (let id in cart) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) continue;
    qty += cart[id];
    sum += product.price * cart[id];
  }

  return { qty, sum };
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart]");
  if (!badge) return;

  const totals = cartTotals();
  badge.textContent = `Кошик: ${totals.qty} шт / ${totals.sum.toFixed(2)} €`;
}

// === КАТАЛОГ ===
function renderCatalog() {
  const catalog = document.getElementById("catalog");
  if (!catalog) return;

  catalog.innerHTML = "";

  PRODUCTS.forEach(product => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Категорія: ${product.category}</p>
      <p><b>${product.price} €</b></p>
      <button onclick="addToCart('${product.id}')">Додати до кошика</button>
    `;

    catalog.appendChild(div);
  });
}

// === ЗАПУСК ===
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  updateCartBadge();
});
