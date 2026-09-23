const dishes = [
  {
    id: 1,
    name: "Idli Sambar",
    category: "Breakfast",
    price: 80,
    description: "Soft steamed idlis served with sambar and chutneys.",
    emoji: "🥣",
    label: "POPULAR"
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "Breakfast",
    price: 120,
    description: "Crispy dosa filled with spiced potato masala.",
    emoji: "🥞",
    label: "BESTSELLER"
  },
  {
    id: 3,
    name: "Pongal",
    category: "Breakfast",
    price: 95,
    description: "Comforting rice and lentil dish with pepper and ghee.",
    emoji: "🍚",
    label: "TRADITIONAL"
  },
  {
    id: 4,
    name: "South Indian Meals",
    category: "Meals",
    price: 180,
    description: "Rice, sambar, rasam, poriyal, kootu, curd, and sweet.",
    emoji: "🍛",
    label: "FAVOURITE"
  },
  {
    id: 5,
    name: "Special Banana Leaf Thali",
    category: "Meals",
    price: 299,
    description: "A complete traditional meal served on a banana leaf.",
    emoji: "🍽️",
    label: "SPECIAL"
  },
  {
    id: 6,
    name: "Vada",
    category: "Tiffin",
    price: 70,
    description: "Crispy lentil fritters served with sambar and chutney.",
    emoji: "🧆",
    label: "HOT"
  },
  {
    id: 7,
    name: "Onion Uttapam",
    category: "Tiffin",
    price: 130,
    description: "Thick savoury pancake topped with onion and coriander.",
    emoji: "🥞",
    label: "POPULAR"
  },
  {
    id: 8,
    name: "Filter Coffee",
    category: "Drinks",
    price: 45,
    description: "Strong aromatic South Indian filter coffee.",
    emoji: "☕",
    label: "MUST TRY"
  },
  {
    id: 9,
    name: "Fresh Lime Soda",
    category: "Drinks",
    price: 60,
    description: "Refreshing lime drink served sweet or salted.",
    emoji: "🍋",
    label: "REFRESHING"
  },
  {
    id: 10,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 75,
    description: "Soft milk dumplings served warm in sugar syrup.",
    emoji: "🍮",
    label: "SWEET"
  },
  {
    id: 11,
    name: "Kesari Bath",
    category: "Desserts",
    price: 65,
    description: "Traditional semolina sweet with saffron and cashews.",
    emoji: "🍯",
    label: "TRADITIONAL"
  },
  {
    id: 12,
    name: "Curd Rice",
    category: "Meals",
    price: 90,
    description: "Cooling curd rice finished with a gentle tempering.",
    emoji: "🥗",
    label: "COMFORT"
  }
];

let order = JSON.parse(localStorage.getItem("vaazhaiIllaiOrder")) || [];

const foodGrid = document.getElementById("foodGrid");
const noItems = document.getElementById("noItems");
const filterButtons = document.querySelectorAll(".filter-button");

const orderDrawer = document.getElementById("orderDrawer");
const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");
const overlay = document.getElementById("overlay");
const closeDrawer = document.getElementById("closeDrawer");
const orderSpecial = document.getElementById("orderSpecial");
const placeOrder = document.getElementById("placeOrder");
const toast = document.getElementById("toast");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function currency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function renderDishes(category = "All") {
  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  foodGrid.innerHTML = "";

  if (filteredDishes.length === 0) {
    noItems.classList.add("show");
    return;
  }

  noItems.classList.remove("show");

  filteredDishes.forEach((dish) => {
    const card = document.createElement("article");
    card.className = "food-card";

    card.innerHTML = `
      <div class="food-image">
        <span class="food-label">${dish.label}</span>
        <span>${dish.emoji}</span>
      </div>

      <div class="food-details">
        <div class="food-category">${dish.category}</div>
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>

        <div class="food-bottom">
          <strong class="food-price">${currency(dish.price)}</strong>
          <button
            class="add-food"
            data-id="${dish.id}"
            aria-label="Add ${dish.name} to order"
          >
            +
          </button>
        </div>
      </div>
    `;

    foodGrid.appendChild(card);
  });
}

function saveOrder() {
  localStorage.setItem("vaazhaiIllaiOrder", JSON.stringify(order));
}

function addToOrder(dishId) {
  const existingItem = order.find((item) => item.id === dishId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    order.push({
      id: dishId,
      quantity: 1
    });
  }

  saveOrder();
  renderOrder();
  showToast("Dish added to your order");
}

function changeQuantity(dishId, amount) {
  const item = order.find((orderItem) => orderItem.id === dishId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    order = order.filter((orderItem) => orderItem.id !== dishId);
  }

  saveOrder();
  renderOrder();
}

function removeFromOrder(dishId) {
  order = order.filter((item) => item.id !== dishId);
  saveOrder();
  renderOrder();
  showToast("Dish removed from your order");
}

function renderOrder() {
  if (order.length === 0) {
    orderItems.innerHTML = `
      <div class="empty-order">
        <span>🍽️</span>
        <p>Your order is empty.</p>
        <small>Add a dish from our menu.</small>
      </div>
    `;

    orderTotal.textContent = "₹0";
    return;
  }

  let total = 0;

  orderItems.innerHTML = order
    .map((item) => {
      const dish = dishes.find((dishItem) => dishItem.id === item.id);

      if (!dish) return "";

      total += dish.price * item.quantity;

      return `
        <div class="order-item">
          <div class="order-item-image">${dish.emoji}</div>

          <div>
            <h4>${dish.name}</h4>
            <p>${currency(dish.price)}</p>

            <div class="order-quantity">
              <button data-action="decrease" data-id="${dish.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${dish.id}">+</button>
            </div>
          </div>

          <button
            class="remove-order"
            data-action="remove"
            data-id="${dish.id}"
            aria-label="Remove ${dish.name}"
          >
            ×
          </button>
        </div>
      `;
    })
    .join("");

  orderTotal.textContent = currency(total);
}

function openOrderDrawer() {
  orderDrawer.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeOrderDrawer() {
  orderDrawer.classList.remove("open");
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
  }, 2600);
}

/* Menu filter */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    renderDishes(button.dataset.category);
  });
});

/* Add food to order */

foodGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-food");

  if (!addButton) return;

  addToOrder(Number(addButton.dataset.id));
});

/* Order drawer */

orderItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const dishId = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") {
    changeQuantity(dishId, 1);
  }

  if (action === "decrease") {
    changeQuantity(dishId, -1);
  }

  if (action === "remove") {
    removeFromOrder(dishId);
  }
});

orderSpecial.addEventListener("click", () => {
  addToOrder(5);
  openOrderDrawer();
});

closeDrawer.addEventListener("click", closeOrderDrawer);
overlay.addEventListener("click", closeOrderDrawer);

placeOrder.addEventListener("click", () => {
  if (order.length === 0) {
    showToast("Please add a dish first");
    return;
  }

  showToast("Order demo submitted successfully");
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

/* Reservation form */

document
  .getElementById("reservationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    formMessage.textContent =
      "Thank you! Your table request has been received.";
    formMessage.classList.add("show");

    event.target.reset();

    setTimeout(() => {
      formMessage.classList.remove("show");
    }, 5000);
  });

/* Newsletter form */

document
  .getElementById("newsletterForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    showToast("Thank you for subscribing to Vaazhai Illai");
    event.target.reset();
  });

/* Set minimum booking date to today */

const bookingDate = document.getElementById("bookingDate");

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

bookingDate.min = `${year}-${month}-${day}`;

/* Initial page rendering */

renderDishes();
renderOrder();
