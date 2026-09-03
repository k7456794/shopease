import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  // Get the current number of items from our global cart.
  const { cartCount } = useCart();

  return (
    <header className="bg-black text-white shadow-md">
      <nav className="max-w-[1320px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo / Brand */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl font-bold tracking-wide"
          >
            Shop<span className="text-gray-400">Ease</span>
          </button>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Home
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Products
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Categories
              </button>
            </li>
          </ul>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative px-4 py-2 rounded-lg border border-gray-600
                       hover:bg-white hover:text-black
                       transition-all duration-300"
          >
            🛒 Cart

            {/* Show cart count only when cart has items */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2
                               bg-red-500 text-white
                               text-xs font-bold
                               min-w-[22px] h-[22px]
                               rounded-full
                               flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;