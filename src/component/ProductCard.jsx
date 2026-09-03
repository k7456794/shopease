import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const originalPrice =
    product.price / (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    // Add the selected product to our global cart.
    addToCart(product);

    // Show a short confirmation message to the user.
    setAdded(true);

    // Hide the confirmation after 1.5 seconds.
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-md
                 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Product image */}
      <div className="relative bg-gray-100 h-64 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <span
            className="absolute top-3 left-3 bg-red-500 text-white
                       text-sm font-semibold px-3 py-1 rounded-full"
          >
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Product information */}
      <div className="p-5">
        <p className="text-sm text-gray-500 capitalize mb-2">
          {product.category}
        </p>

        <h3
          className="text-lg font-bold text-gray-900
                     line-clamp-2 min-h-[56px]"
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-yellow-500">★</span>

          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>

          <span className="text-sm text-gray-400">
            / 5
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-sm mt-3 font-medium ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="w-full mt-5 bg-black text-white py-3 rounded-xl
                     font-semibold hover:bg-gray-800
                     transition-colors duration-300
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {added ? "✓ Added to Cart" : "🛒 Add to Cart"}
        </button>

        {/* View Details */}
        <button
          type="button"
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full mt-3 border border-gray-300
                     text-gray-900 py-3 rounded-xl
                     font-semibold hover:bg-gray-100
                     transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default ProductCard;