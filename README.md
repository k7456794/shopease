
# 🛍️ ShopEase — React E-Commerce Website

ShopEase is a modern and responsive e-commerce web application built with **React.js**.

The project provides a simple shopping experience where users can browse products, search products, filter by category, view product details, and manage their shopping cart.

This project was built as a practical frontend development project to demonstrate React, API integration, state management, responsive UI design, and modern development practices.

## 🔗 Project Links

**Live Demo:** https://shopease-six-mauve.vercel.app

**GitHub:** https://github.com/k7456794/shopease

---

## 🚀 Features

## 🚀 Features

- 🏠 Modern homepage with featured products
- 🛍️ Browse all products
- 🔎 Search products
- 📂 Filter products by category
- ↕️ Sort products by:
  - Price: Low to High
  - Price: High to Low
  - Rating
  - Name
- ⭐ Product ratings
- 💰 Product prices and discount information
- 📦 Stock availability
- 🔍 Product details page
- 🛒 Add products to cart
- ➕ Increase product quantity
- ➖ Decrease product quantity
- ❌ Remove products from cart
- 💵 Automatic cart total calculation
- 🔢 Cart item counter in the navbar
- 💾 Cart persistence using LocalStorage
- 📱 Responsive design for different screen sizes
- ⚡ API integration using Axios
- 🧭 Client-side navigation using React Router
- 📄 Professional footer and navigation

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript (ES6+)
- JSX
- Tailwind CSS
- React Router DOM
- Axios

### API

- DummyJSON API

### Development Tools

- Node.js
- npm
- Visual Studio Code
- Git
- GitHub

---

## 📡 API Integration

This project uses the **DummyJSON API** to retrieve product and category data.

The application uses API endpoints for:

- Getting products
- Searching products
- Getting product categories
- Getting products by category
- Getting individual product details

API requests are handled through **Axios**.

---

## 🛒 Shopping Cart

The shopping cart is managed using the React **Context API**.

Cart functionality includes:

- Add product to cart
- Increase quantity
- Decrease quantity
- Remove product
- Calculate total items
- Calculate total price
- Save cart data to LocalStorage

Because LocalStorage is used, the cart remains available even after refreshing the browser.

---

## 📁 Project Structure


ecommerceproject/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── component/
│   │   ├── Cart.jsx
│   │   ├── Category.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Products.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── index.js
│
├── package.json
├── README.md
└── public/