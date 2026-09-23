const products = [
  {
    id: 1,
    name: "Vitamin C 1000mg Tablets",
    category: "Wellness",
    price: 249,
    oldPrice: 299,
    rating: 4.8,
    reviews: 124,
    emoji: "🍊",
    tag: "BESTSELLER"
  },
  {
    id: 2,
    name: "Digital Blood Pressure Monitor",
    category: "Medicine",
    price: 1299,
    oldPrice: 1599,
    rating: 4.7,
    reviews: 86,
    emoji: "🩺",
    tag: "POPULAR"
  },
  {
    id: 3,
    name: "Daily Moisturising Lotion",
    category: "Personal Care",
    price: 349,
    oldPrice: 420,
    rating: 4.9,
    reviews: 210,
    emoji: "🧴",
    tag: "NEW"
  },
  {
    id: 4,
    name: "Herbal Immunity Capsules",
    category: "Wellness",
    price: 599,
    oldPrice: 699,
    rating: 4.6,
    reviews: 92,
    emoji: "🌿",
    tag: "20% OFF"
  },
  {
    id: 5,
    name: "Pain Relief Tablets",
    category: "Medicine",
    price: 89,
    oldPrice: 110,
    rating: 4.5,
    reviews: 67,
    emoji: "💊",
    tag: "ESSENTIAL"
  },
  {
    id: 6,
    name: "Gentle Baby Shampoo",
    category: "Baby Care",
    price: 275,
    oldPrice: 320,
    rating: 4.9,
    reviews: 156,
    emoji: "🍼",
    tag: "GENTLE"
  },
  {
    id: 7,
    name: "Omega 3 Fish Oil Capsules",
    category: "Wellness",
    price: 749,
    oldPrice: 899,
    rating: 4.8,
    reviews: 132,
    emoji: "🐟",
    tag: "POPULAR"
  },
  {
    id: 8,
    name: "Antibacterial Hand Wash",
    category: "Personal Care",
    price: 159,
    oldPrice: 190,
    rating: 4.6,
    reviews: 78,
    emoji: "🧼",
    tag: "VALUE PACK"
  }
];

let cart = JSON.parse(localStorage.getItem("medicareCart")) || [];

const productGrid = document.getElementById("productGrid");
const emptyProducts = document.getElementById("emptyProducts");
const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const toast = document.getElementById("toast");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
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
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>
        <span class="product-emoji">${product.emoji}</span>
      </div>

      <div class="product-details">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>
        <div class="product-rating">
          ★★★★★ <span>${product.rating} (${product.reviews})</span>
        </div>

        <div class="product-bottom">
          <div class="product-price">
            ${formatCurrency(product.price)}
            <del>${formatCurrency(product.oldPrice)}</del>
          </div>
          <button class="add-button" data-id="${product.id}" aria-label="Add product to cart">
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

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

function saveCart() {
  localStorage.setItem("medicareCart", JSON.stringify(cart));
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
  updateCart();
  showToast("Product added to your cart");
}

function changeQuantity(productId, amount) {
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  saveCart();
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCart();
  showToast("Product removed from your cart");
}

function updateCart() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>🛒</span>
        <p>Your cart is empty.</p>
        <small>Add some products to get started.</small>
      </div>
    `;

    cartTotal.textContent = "₹0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart
    .map((item) => {
      const product = products.find((productItem) => productItem.id === item.id);

      if (!product) return "";

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return `
        <div class="cart-item">
          <div class="cart-item-image">${product.emoji}</div>

          <div>
            <h4>${product.name}</h4>
            <p>${formatCurrency(product.price)}</p>

            <div class="cart-quantity">
              <button data-action="decrease" data-id="${product.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${product.id}">+</button>
            </div>
          </div>

          <button class="remove-item" data-action="remove" data-id="${product.id}">
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

document.querySelectorAll(".category-card").forEach((categoryCard) => {
  categoryCard.addEventListener("click", () => {
    const selectedCategory = categoryCard.dataset.category;

    categoryFilter.value = selectedCategory;
    productSearch.value = "";
    filterProducts();

    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.getElementById("viewAll").addEventListener("click", (event) => {
  event.preventDefault();

  categoryFilter.value = "All";
  productSearch.value = "";
  renderProducts(products);

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("promoButton").addEventListener("click", () => {
  categoryFilter.value = "Wellness";
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

  showToast("Checkout demo: order ready to place");
});

/* Mobile navigation */

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

/* Contact form */

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const formMessage = document.getElementById("formMessage");
  formMessage.textContent = "Thank you! We will get back to you shortly.";
  formMessage.classList.add("show");

  event.target.reset();

  setTimeout(() => {
    formMessage.classList.remove("show");
  }, 5000);
});

/* Newsletter form */

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("newsletterEmail").value;

  if (email) {
    showToast("You have successfully subscribed");
    event.target.reset();
  }
});

/* Initial rendering */

renderProducts();
updateCart();
