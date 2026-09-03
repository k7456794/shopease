import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
    cartTotal,
  } = useCart();

  // If there are no products, show a helpful empty-cart message.
  if (cartItems.length === 0) {
    return (
      <main className="py-20">
        <div className="max-w-[900px] mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🛒</div>

          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add some products to your cart and they will appear here.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-8 bg-black text-white px-8 py-3 rounded-xl
                       font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Cart products */}
          <section className="space-y-5">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-5
                           flex flex-col sm:flex-row gap-5"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-xl bg-gray-100"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    ${item.price.toFixed(2)} each
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 rounded-lg bg-gray-200
                                 hover:bg-gray-300 font-bold"
                    >
                      −
                    </button>

                    <span className="font-semibold min-w-[30px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 rounded-lg bg-gray-200
                                 hover:bg-gray-300 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-medium mt-4
                               hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Product subtotal */}
                <div className="sm:text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Subtotal
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* Order summary */}
          <aside className="bg-gray-100 rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="flex justify-between mt-6 text-gray-600">
              <span>Total Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="border-t border-gray-300 my-5" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-2xl font-bold">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout will be connected later */}
            <button
              type="button"
              onClick={() => alert("Checkout feature coming soon!")}
              className="w-full mt-7 bg-black text-white py-4 rounded-xl
                         font-semibold hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="w-full mt-3 border border-gray-300 py-3 rounded-xl
                         font-semibold hover:bg-white transition-colors"
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;