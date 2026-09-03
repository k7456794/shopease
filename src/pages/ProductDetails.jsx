import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  // Gets the product ID from the URL.
  // Example: /product/1 → id will be "1"
  const { id } = useParams();

  // Allows us to go back to the products page.
  const navigate = useNavigate();

  // Get the addToCart function from our global cart context.
  const { addToCart } = useCart();

  // Stores the product received from the API.
  const [product, setProduct] = useState(null);

  // Controls the loading state.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the API request fails.
  const [error, setError] = useState("");

  // Fetch the selected product when the page opens
  // or when the product ID in the URL changes.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        setProduct(response.data);
      } catch (error) {
        console.error("Product details error:", error);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="py-20">
        <h2 className="text-2xl font-bold text-center">
          Loading product...
        </h2>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="py-20">
        <p className="text-red-500 text-center font-semibold">
          {error}
        </p>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  // If no product was returned
  if (!product) {
    return (
      <main className="py-20">
        <h2 className="text-2xl font-bold text-center">
          Product not found.
        </h2>
      </main>
    );
  }

  // Calculate the original price before discount.
  const originalPrice =
    product.price / (1 - product.discountPercentage / 100);

  return (
    <main className="py-12">
      <div className="max-w-[1100px] mx-auto px-4">

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mb-8 text-gray-600 hover:text-black font-medium transition-colors"
        >
          ← Back to Products
        </button>

        {/* Product details card */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Product image */}
          <div className="bg-gray-100 min-h-[450px] flex items-center justify-center p-8">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-w-full max-h-[420px] object-contain"
            />
          </div>

          {/* Product information */}
          <div className="p-8">

            {/* Category */}
            <p className="text-sm text-gray-500 capitalize mb-3">
              {product.category}
            </p>

            {/* Product title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-yellow-500 text-xl">
                ★
              </span>

              <span className="font-semibold">
                {product.rating}
              </span>

              <span className="text-gray-400">
                / 5
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>

              {product.discountPercentage > 0 && (
                <>
                  <span className="text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>

                  <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-7 mt-6">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold">
                  ✓ {product.stock} items available
                </p>
              ) : (
                <p className="text-red-600 font-semibold">
                  ✕ Out of stock
                </p>
              )}
            </div>

            {/* Add to Cart button */}
            <button
               type="button"
              onClick={() => addToCart(product)}
             disabled={product.stock <= 0}
             className="w-full mt-8 bg-black text-white py-4 rounded-xl font-semibold
             hover:bg-gray-800 transition-colors duration-300
             disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
             🛒 Add to Cart
          
          </button>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;