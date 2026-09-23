const products = [
  {
    id: 1,
    name: "Fresh Red Apples",
    category: "Fruits",
    price: 180,
    oldPrice: 220,
    emoji: "🍎",
    rating: 4.8,
    reviews: 124,
    tag: "FRESH"
  },
  {
    id: 2,
    name: "Organic Bananas",
    category: "Fruits",
    price: 60,
    oldPrice: 80,
    emoji: "🍌",
    rating: 4.7,
    reviews: 98,
    tag: "POPULAR"
  },
  {
    id: 3,
    name: "Farm Fresh Carrots",
    category: "Vegetables",
    price: 75,
    oldPrice: 95,
    emoji: "🥕",
    rating: 4.6,
    reviews: 76,
    tag: "FRESH"
  },
  {
    id: 4,
    name: "Green Broccoli",
    category: "Vegetables",
    price: 120,
    oldPrice: 150,
    emoji: "🥦",
    rating: 4.8,
    reviews: 91,
    tag: "HEALTHY"
  },
  {
    id: 5,
    name: "Fresh Full Cream Milk",
    category: "Dairy",
    price: 68,
    oldPrice: 75,
    emoji: "🥛",
    rating: 4.9,
    reviews: 240,
    tag: "DAILY"
  },
  {
    id: 6,
    name: "Natural Curd Cup",
    category: "Dairy",
    price: 45,
    oldPrice: 55,
    emoji: "🥣",
    rating: 4.7,
    reviews: 88,
    tag: "FRESH"
  },
  {
    id: 7,
    name: "Classic Potato Chips",
    category: "Snacks",
    price: 40,
    oldPrice: 50,
    emoji: "🍟",
    rating: 4.5,
    reviews: 65,
    tag: "POPULAR"
  },
  {
    id: 8,
    name: "Butter Cookies",
    category: "Snacks",
    price: 110,
    oldPrice: 140,
    emoji: "🍪",
    rating: 4.6,
    reviews: 47,
    tag: "NEW"
  },
  {
    id: 9,
    name: "Fresh Orange Juice",
    category: "Beverages",
    price: 95,
    oldPrice: 120,
    emoji: "🧃",
    rating: 4.8,
    reviews: 113,
    tag: "REFRESHING"
  },
  {
    id: 10,
    name: "Natural Green Tea",
    category: "Beverages",
    price: 160,
    oldPrice: 190,
    emoji: "🍵",
    rating: 4.7,
    reviews: 69,
    tag: "HEALTHY"
  },
  {
    id: 11,
    name: "Premium Dish Wash",
    category: "Household",
    price: 145,
    oldPrice: 175,
    emoji: "🧽",
    rating: 4.5,
    reviews: 52,
    tag: "VALUE"
  },
  {
    id: 12,
    name: "Multi-Purpose Cleaner",
    category: "Household",
    price: 210,
    oldPrice: 250,
    emoji: "🧴",
    rating: 4.6,
    reviews: 44,
    tag: "OFFER"
  }
];

let cart = JSON.parse(localStorage.getItem("freshBasketCart")) || [];

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

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const themeToggle = document.getElementById("themeToggle");

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
    card.className = "product-card section-reveal visible";

    card.innerHTML = `
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>
        <span class="product-emoji">${product.emoji}</span>
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
  localStorage.setItem("freshBasketCart", JSON.stringify(cart));
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
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>🛒</span>
        <p>Your cart is empty.</p>
        <small>Add products to start shopping.</small>
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
          <div class="cart-item-image">${product.emoji}</div>

          <div>
            <h4>${product.name}</h4>
            <p>${formatCurrency(product.price)}</p>

            <div class="quantity-controls">
              <button data-action="decrease" data-id="${product.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${product.id}">+</button>
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

/* Product events */

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-button");

  if (!addButton) return;

  addToCart(Number(addButton.dataset.id));
});

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

/* Category buttons */

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

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
  categoryFilter.value = "Fruits";
  productSearch.value = "";

  filterProducts();

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

/* Cart events */

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

  showToast("Checkout demo completed successfully");
});

/* Mobile menu */

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

/* Theme switcher */

const savedTheme = localStorage.getItem("freshBasketTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");

  themeToggle.textContent = isDark ? "☀" : "☾";
  localStorage.setItem("freshBasketTheme", isDark ? "dark" : "light");

  showToast(isDark ? "Dark theme enabled" : "Light theme enabled");
});

/* Newsletter form */

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
      "Thank you. Our team will contact you soon.";
    formMessage.classList.add("show");

    event.target.reset();

    setTimeout(() => {
      formMessage.classList.remove("show");
    }, 5000);
  });

/* Scroll reveal effect */

const revealElements = document.querySelectorAll(".section-reveal");

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
