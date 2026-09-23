const products = [
  {
  id: 1,
  name: "Nova X5 Smartphone",
  category: "Smartphones",
  price: 18999,
  oldPrice: 20999,
  rating: 4.8,
  reviews: 142,
  tag: "POPULAR",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/CFKUmVcfDLCDHoDyAA8tsR.jpg"
},
  {
    id: 2,
    name: "Pro Max Smartphone",
    category: "Smartphones",
    price: 32999,
    oldPrice: 35999,
    rating: 4.9,
    reviews: 216,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85"
  },
  {
  id: 3,
  name: "Budget 5G Smartphone",
  category: "Smartphones",
  price: 12999,
  oldPrice: 14999,
  rating: 4.6,
  reviews: 87,
  tag: "VALUE",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/cTPweQnLTYKbQgk9fiVL7Q.jpg"
},
  {
    id: 4,
    name: "Fast USB-C Charger",
    category: "Accessories",
    price: 699,
    oldPrice: 899,
    rating: 4.8,
    reviews: 155,
    tag: "FAST CHARGE",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    category: "Accessories",
    price: 1499,
    oldPrice: 1999,
    rating: 4.7,
    reviews: 124,
    tag: "POPULAR",
    image:
      "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/o58oA6DmCueooZywuipR7L.jpeg"
  },
  {
  id: 6,
  name: "Premium Phone Case",
  category: "Accessories",
  price: 399,
  oldPrice: 599,
  rating: 4.6,
  reviews: 92,
  tag: "NEW",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/F6ruVPFrz84LhF7an4m8mU.jpg"
},
  {
  id: 7,
  name: "Tempered Glass Screen Guard",
  category: "Accessories",
  price: 249,
  oldPrice: 350,
  rating: 4.8,
  reviews: 188,
  tag: "ESSENTIAL",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/Msid66h5D6gqQofvNt8A7R.jpg"
},
  {
  id: 8,
  name: "Replacement Mobile Battery",
  category: "Repair Parts",
  price: 1199,
  oldPrice: 1499,
  rating: 4.7,
  reviews: 64,
  tag: "GENUINE",
  image:
    "https://files.manuscdn.com/search-media/310519663446112952/OO4srgXGvcK2CddXJ3khlg/qTVSwN6eXgBRtUuonfrR5H.jpg"
}
];

let cart = JSON.parse(localStorage.getItem("fixPointCart" )) || [];

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

function currency(amount) {
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

    card.className = "product-card reveal visible";

    card.innerHTML = `
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85';"
        />
      </div>

      <div class="product-details">
        <div class="product-category">${product.category}</div>

        <h3>${product.name}</h3>

        <div class="product-rating">
          ★★★★★
          <span>${product.rating} (${product.reviews} )</span>
        </div>

        <div class="product-bottom">
          <div class="product-price">
            ${currency(product.price)}
            <del>${currency(product.oldPrice)}</del>
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

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

function saveCart() {
  localStorage.setItem("fixPointCart", JSON.stringify(cart));
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
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
        <small>Add products to get started.</small>
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

      total += product.price * item.quantity;

      return `
        <div class="cart-item">
          <div class="cart-item-image">
            <img
              src="${product.image}"
              alt="${product.name}"
              onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85';"
            />
          </div>

          <div>
            <h4>${product.name}</h4>
            <p>${currency(product.price )}</p>

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

  cartTotal.textContent = currency(total);
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

/* Accessories shortcut */

document
  .getElementById("accessoriesButton")
  .addEventListener("click", () => {
    categoryFilter.value = "Accessories";
    productSearch.value = "";
    filterProducts();

    document.getElementById("phones").scrollIntoView({
      behavior: "smooth"
    });
  });

/* Cart */

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

/* Theme switcher: Light -> Dark -> Neon -> Light */

const savedTheme = localStorage.getItem("fixPointTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeButton.textContent = "☀";
}

if (savedTheme === "neon") {
  document.body.classList.add("neon-theme");
  themeButton.textContent = "⚡";
}

themeButton.addEventListener("click", () => {
  if (
    !document.body.classList.contains("dark-theme") &&
    !document.body.classList.contains("neon-theme")
  ) {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "☀";
    localStorage.setItem("fixPointTheme", "dark");
    showToast("Dark theme enabled");
    return;
  }

  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("neon-theme");
    themeButton.textContent = "⚡";
    localStorage.setItem("fixPointTheme", "neon");
    showToast("Neon theme enabled");
    return;
  }

  document.body.classList.remove("neon-theme");
  themeButton.textContent = "◐";
  localStorage.setItem("fixPointTheme", "light");
  showToast("Light theme enabled");
});

/* Repair booking form */

document
  .getElementById("bookingForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    formMessage.textContent =
      "Repair request received. Our team will contact you shortly.";
    formMessage.classList.add("show");

    event.target.reset();

    setTimeout(() => {
      formMessage.classList.remove("show");
    }, 5000);
  });

/* Contact form */

document
  .getElementById("contactForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const message = document.getElementById("contactMessageResult");

    message.textContent =
      "Thank you. We will get back to you soon.";
    message.classList.add("show");

    event.target.reset();

    setTimeout(() => {
      message.classList.remove("show");
    }, 5000);
  });

/* Newsletter */

document
  .getElementById("newsletterForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    showToast("Thank you for subscribing");
    event.target.reset();
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
