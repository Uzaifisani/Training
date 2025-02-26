import axios from "axios";
const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};
export const fetchProductsBasedId = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};
export const fetchProductCategories = async () => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};
export const fetchProductByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data;
};

export const deleteProductId = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.status;
};

export const addProductApi = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.status;
};

export const UpdateProductApi = async (id, product) => {
  const response = await axios.patch(`${API_URL}/products/${id}`, product);
  return response.status;
};
