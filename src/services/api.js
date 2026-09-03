import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = () => api.get("/products");

export const getCategories = () => api.get("/products/category-list");

export const getProductsByCategory = (category) =>
  api.get(`/products/category/${category}`);

export const getProductById = (id) => api.get(`/products/${id}`);

// Search the complete DummyJSON product dataset.
export const searchProducts = (query) =>
  api.get("/products/search", {
    params: {
      q: query,
    },
  });

export default api;