import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();

        // We only need a few products for the Home page.
        setFeaturedProducts(response.data.products.slice(0, 6));
      } catch (error) {
        console.error("Featured products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main className="pt-20">
      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gray-100">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="min-h-[550px] flex items-center justify-center">
            <div className="max-w-3xl text-center">
              <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-gray-500">
                Welcome to ShopEase
              </p>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-5 leading-tight">
                Find Products You'll
                <span className="block">Love to Shop</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl mt-6 leading-8">
                Discover quality products, explore different categories,
                and enjoy a simple shopping experience.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-8 bg-black text-white px-8 py-4 rounded-xl
                           font-semibold text-lg hover:bg-gray-800
                           transition-all duration-300 hover:scale-105"
              >
                Shop Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STORE BENEFITS ==================== */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl">🚚</div>

              <h2 className="text-xl font-bold mt-4">
                Fast Delivery
              </h2>

              <p className="text-gray-500 mt-2">
                Get your favorite products delivered quickly.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl">🔒</div>

              <h2 className="text-xl font-bold mt-4">
                Secure Shopping
              </h2>

              <p className="text-gray-500 mt-2">
                Enjoy a simple and secure shopping experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl">⭐</div>

              <h2 className="text-xl font-bold mt-4">
                Quality Products
              </h2>

              <p className="text-gray-500 mt-2">
                Explore products from different categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Explore Our Store
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-3">
              Discover some of our popular products.
            </p>
          </div>

          {loading ? (
            <h3 className="text-xl font-semibold text-center">
              Loading featured products...
            </h3>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden
                             shadow-md hover:shadow-xl
                             transition-all duration-300"
                >
                  <div className="bg-gray-100 h-56 overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover
                                 hover:scale-105 transition-transform
                                 duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </p>

                    <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between mt-5">
                      <span className="text-xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/product/${product.id}`)
                        }
                        className="bg-black text-white px-4 py-2
                                   rounded-lg font-semibold
                                   hover:bg-gray-800
                                   transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View all products */}
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="border border-black px-8 py-3 rounded-xl
                         font-semibold hover:bg-black hover:text-white
                         transition-all duration-300"
            >
              View All Products →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;