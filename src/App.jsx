import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./component/Cart";
import { CartProvider } from "./context/CartContext";
import Footer from "./component/Footer";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* Navbar stays visible on every page */}
        <Navbar />

        {/* Different URL displays a different page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;