function Category({ finalCategory, setCatName, selectedCategory }) {
  // Create a category button for every category received from the API.
  const categories = finalCategory.map((category) => {
    // Check whether this category is currently selected.
    const isActive = selectedCategory === category;

    return (
      <li key={category}>
        <button
          type="button"
          onClick={() => setCatName(category)}
          className={`w-full text-left px-4 py-3 mb-2 rounded-lg
            font-medium capitalize transition-all duration-300
            ${
              isActive
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
        >
          {category}
        </button>
      </li>
    );
  });

  return (
    <div className="w-full">
      {/* Category section heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-5">
        Product Categories
      </h2>

      <ul>
        {/* All Products button */}
        <li>
          <button
            type="button"
            onClick={() => setCatName("")}
            className={`w-full text-left px-4 py-3 mb-2 rounded-lg
              font-semibold transition-all duration-300
              ${
                selectedCategory === ""
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            All Products
          </button>
        </li>

        {/* API categories */}
        {categories}
      </ul>
    </div>
  );
}

export default Category;