import { useEffect, useState } from "react";
import Category from "../component/Category";
import ProductCard from "../component/ProductCard";

import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from "../services/api";

function Products() {
  const [finalCategory, setFinalCategory] = useState([]);
  const [finalProducts, setFinalProducts] = useState([]);
  const [catName, setCatName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load all available categories once when the page opens.
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setFinalCategory(response.data);
      } catch (error) {
        console.error("Category loading error:", error);
      }
    };

    loadCategories();
  }, []);

  // Handle products, categories, and search in one effect.
  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let products = [];

        if (searchTerm.trim() !== "") {
          // Use the API search endpoint so we search the complete dataset.
          const response = await searchProducts(searchTerm.trim());
          products = response.data.products;

          // If a category is selected, apply it to the search results.
          if (catName !== "") {
            products = products.filter(
              (product) => product.category === catName
            );
          }
        } else if (catName !== "") {
          // Load products belonging to the selected category.
          const response = await getProductsByCategory(catName);
          products = response.data.products;
        } else {
          // Load the default product list.
          const response = await getProducts();
          products = response.data.products;
        }

        // Prevent an older request from replacing newer results.
        if (!cancelled) {
          setFinalProducts(products);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Product loading error:", error);
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // Small delay prevents an API request for every typed character.
    const timer = setTimeout(loadProducts, 400);

    return () => {
      clearTimeout(timer);
      cancelled = true;
    };
  }, [searchTerm, catName]);

  // Create a copy before sorting so the original API data stays unchanged.
  const sortedProducts = [...finalProducts];

  if (sortOption === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sortOption === "name") {
    sortedProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <main className="py-10">
      <div className="max-w-[1320px] mx-auto px-4">

        {/* Page heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Our Products
          </h1>

          <p className="text-gray-500 mt-3">
            Find the products you're looking for.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-xl
                       px-5 py-4 outline-none
                       focus:border-black
                       transition-colors duration-300"
          />

          {searchTerm && (
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-sm font-semibold text-gray-500
                           hover:text-black"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Categories + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* Category sidebar */}
          <aside>
            <Category
              finalCategory={finalCategory}
              setCatName={setCatName}
              selectedCategory={catName}
            />
          </aside>

          {/* Product section */}
          <section>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-center font-semibold mb-5">
                {error}
              </p>
            )}

            {/* Sorting */}
            <div className="flex flex-col sm:flex-row
                            justify-between items-start
                            sm:items-center gap-4 mb-5">

              <p className="text-gray-500">
                Showing {sortedProducts.length} product
                {sortedProducts.length !== 1 ? "s" : ""}
              </p>

              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="border border-gray-300 rounded-lg
                           px-4 py-2 bg-white outline-none
                           focus:border-black"
              >
                <option value="">Sort Products</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="rating">
                  Rating: High to Low
                </option>
                <option value="name">
                  Name: A to Z
                </option>
              </select>
            </div>

            {/* Loading state */}
            {loading ? (
              <h2 className="text-2xl font-bold text-center py-10">
                Products Loading...
              </h2>

            ) : sortedProducts.length === 0 ? (

              /* Empty state */
              <div className="text-center py-16">
                <div className="text-5xl mb-5">
                  🔍
                </div>

                <h2 className="text-2xl font-bold">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try searching with another product name.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-6 bg-black text-white
                             px-6 py-3 rounded-xl
                             font-semibold hover:bg-gray-800"
                >
                  Clear Search
                </button>
              </div>

            ) : (

              /* Product cards */
              <div className="grid sm:grid-cols-2
                              lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

          </section>
        </div>
      </div>
    </main>
  );
}

export default Products;