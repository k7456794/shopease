import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  // Controls whether the mobile navigation menu is open or closed.
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the current number of items from our global cart.
  const { cartCount } = useCart();

  // Navigate to a page and close the mobile menu.
  // This prevents the menu from staying open after selecting a link.
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-md">
      <nav className="max-w-[1320px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo / Brand */}
          <button
            type="button"
            onClick={() => handleNavigation("/")}
            className="text-2xl font-bold tracking-wide"
          >
            Shop<span className="text-gray-400">Ease</span>
          </button>

          {/* Desktop Navigation Links */}
          {/* hidden = mobile, md:flex = visible on medium/desktop screens */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/")}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Home
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/products")}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Products
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/products")}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Categories
              </button>
            </li>
          </ul>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => handleNavigation("/cart")}
              className="relative px-4 py-2 rounded-lg border border-gray-600
                         hover:bg-white hover:text-black
                         transition-all duration-300"
            >
              🛒 Cart

              {/* Show cart count only when cart has items */}
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2
                             bg-red-500 text-white
                             text-xs font-bold
                             min-w-[22px] h-[22px]
                             rounded-full
                             flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            {/* md:hidden = only visible on mobile/tablet */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="md:hidden text-2xl px-3 py-2 rounded-lg
                         border border-gray-600
                         hover:bg-white hover:text-black
                         transition-all duration-300"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {/* Only appears when menuOpen is true */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-2">

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/")}
                  className="w-full text-left px-4 py-3 rounded-lg
                             hover:bg-gray-800
                             transition-colors duration-300"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/products")}
                  className="w-full text-left px-4 py-3 rounded-lg
                             hover:bg-gray-800
                             transition-colors duration-300"
                >
                  Products
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/products")}
                  className="w-full text-left px-4 py-3 rounded-lg
                             hover:bg-gray-800
                             transition-colors duration-300"
                >
                  Categories
                </button>
              </li>

            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;