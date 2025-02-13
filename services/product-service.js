import axios from "axios";

export const createProduct = (payload) => {
  return axios.post("/products", payload);
};

export const getProducts = (payload) => {
  return axios.get("/products", payload);
};

export const updateProduct = (id, payload) => {
  return axios.post(`/products/${id}`, payload);
};

export const deleteProduct = () => {
  return axios.delete("/products/" + id, payload);
};
