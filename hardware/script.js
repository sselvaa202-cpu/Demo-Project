const products = [
  {
    id: 1,
    name: "Professional Claw Hammer",
    category: "Hand Tools",
    price: 449,
    oldPrice: 599,
    rating: 4.8,
    reviews: 126,
    tag: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Cordless Power Drill",
    category: "Power Tools",
    price: 2499,
    oldPrice: 2999,
    rating: 4.9,
    reviews: 184,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=85"
  },
  {
  id: 3,
  name: "Premium Measuring Tape",
  category: "Hand Tools",
  price: 199,
  oldPrice: 249,
  rating: 4.7,
  reviews: 96,
  tag: "VALUE",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/zDJaiWNNnzermT2qyxL9QH.jpg"
},
  {
    id: 4,
    name: "Industrial Safety Helmet",
    category: "Safety",
    price: 349,
    oldPrice: 450,
    rating: 4.8,
    reviews: 74,
    tag: "SAFETY",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Electrical Copper Wire",
    category: "Electrical",
    price: 1299,
    oldPrice: 1499,
    rating: 4.6,
    reviews: 63,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "PVC Plumbing Pipe Set",
    category: "Plumbing",
    price: 799,
    oldPrice: 950,
    rating: 4.7,
    reviews: 51,
    tag: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Protective Work Gloves",
    category: "Safety",
    price: 249,
    oldPrice: 320,
    rating: 4.8,
    reviews: 112,
    tag: "ESSENTIAL",
    image:
      "https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=700&q=85"
  },
  {
  id: 8,
  name: "Interior Wall Paint",
  category: "Paint",
  price: 899,
  oldPrice: 1099,
  rating: 4.6,
  reviews: 42,
  tag: "OFFER",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/s33fymbUqqo8m25GjXybsm.jpg"
},
  {
    id: 9,
    name: "Adjustable Steel Spanner",
    category: "Hand Tools",
    price: 299,
    oldPrice: 375,
    rating: 4.7,
    reviews: 88,
    tag: "DURABLE",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=85"
  },
  {
  id: 10,
  name: "Angle Grinder Machine",
  category: "Power Tools",
  price: 1899,
  oldPrice: 2250,
  rating: 4.8,
  reviews: 102,
  tag: "PRO",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/7VzX8TYrLptRunXv6Ex7Dj.jpg"
},
  {
    id: 11,
    name: "LED Modular Switch Set",
    category: "Electrical",
    price: 599,
    oldPrice: 699,
    rating: 4.7,
    reviews: 49,
    tag: "MODERN",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 12,
    name: "Chrome Bathroom Tap",
    category: "Plumbing",
    price: 1199,
    oldPrice: 1499,
    rating: 4.8,
    reviews: 77,
    tag: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=85"
  }
];

let cart = JSON.parse(localStorage.getItem("buildProCart" )) || [];

const productGrid = document.getElementById("productGrid");
const emptyProducts = document.getElementById("emptyProducts");
const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutButton");

const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const themeButton = document.getElementById("themeButton");

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function renderProducts(list = products) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    emptyProducts.classList.add("show");
    return;
  }

  emptyProducts.classList.remove("show");

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card reveal visible";

    card.innerHTML = `
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>

      <div class="product-details">
        <div class="product-category">${product.category}</div>

        <h3>${product.name}</h3>

        <div class="product-rating">
          ★★★★★
          <span>${product.rating} (${product.reviews})</span>
        </div>

        <div class="product-bottom">
          <div class="product-price">
            ${formatCurrency(product.price)}
            <del>${formatCurrency(product.oldPrice)}</del>
          </div>

          <button
            class="add-button"
            data-id="${product.id}"
            aria-label="Add product to cart"
          >
            +
          </button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

function filterProducts() {
  const searchTerm = productSearch.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

function saveCart() {
  localStorage.setItem("buildProCart", JSON.stringify(cart));
}

function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast("Product added to cart");
}

function changeQuantity(productId, amount) {
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  saveCart();
  renderCart();
  showToast("Product removed from cart");
}

function renderCart() {
  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = itemCount;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>🛒</span>
        <p>Your cart is empty.</p>
        <small>Add tools to get started.</small>
      </div>
    `;

    cartTotal.textContent = "₹0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart
    .map((item) => {
      const product = products.find(
        (productItem) => productItem.id === item.id
      );

      if (!product) return "";

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>

          <div>
            <h4>${product.name}</h4>
            <p>${formatCurrency(product.price)}</p>

            <div class="quantity-controls">
              <button
                data-action="decrease"
                data-id="${product.id}"
              >
                −
              </button>

              <span>${item.quantity}</span>

              <button
                data-action="increase"
                data-id="${product.id}"
              >
                +
              </button>
            </div>
          </div>

          <button
            class="remove-item"
            data-action="remove"
            data-id="${product.id}"
          >
            ×
          </button>
        </div>
      `;
    })
    .join("");

  cartTotal.textContent = formatCurrency(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* Product actions */

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");

  if (!button) return;

  addToCart(Number(button.dataset.id));
});

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

/* Category cards */

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    categoryFilter.value = category;
    productSearch.value = "";

    filterProducts();

    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Offer button */

document.getElementById("offerButton").addEventListener("click", () => {
  categoryFilter.value = "Power Tools";
  productSearch.value = "";

  filterProducts();

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

/* Cart drawer */

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const productId = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") {
    changeQuantity(productId, 1);
  }

  if (action === "decrease") {
    changeQuantity(productId, -1);
  }

  if (action === "remove") {
    removeFromCart(productId);
  }
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }

  showToast("Demo checkout completed successfully");
});

/* Mobile navigation */

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

/* Theme switcher */

const savedTheme = localStorage.getItem("buildProTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeButton.textContent = "☀";
}

if (savedTheme === "industrial") {
  document.body.classList.add("industrial-theme");
  themeButton.textContent = "⚙";
}

themeButton.addEventListener("click", () => {
  if (!document.body.classList.contains("dark-theme") &&
      !document.body.classList.contains("industrial-theme")) {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "☀";
    localStorage.setItem("buildProTheme", "dark");
    showToast("Dark theme enabled");
    return;
  }

  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("industrial-theme");
    themeButton.textContent = "⚙";
    localStorage.setItem("buildProTheme", "industrial");
    showToast("Industrial theme enabled");
    return;
  }

  document.body.classList.remove("industrial-theme");
  themeButton.textContent = "◐";
  localStorage.setItem("buildProTheme", "light");
  showToast("Light theme enabled");
});

/* Newsletter */

document
  .getElementById("newsletterForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    showToast("Thank you for subscribing");
    event.target.reset();
  });

/* Contact form */

document
  .getElementById("contactForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    formMessage.textContent =
      "Thank you. Our team will contact you shortly.";
    formMessage.classList.add("show");

    event.target.reset();

    setTimeout(() => {
      formMessage.classList.remove("show");
    }, 5000);
  });

/* Scroll reveal */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* Initial rendering */

renderProducts();
renderCart();
