import { create } from "./BaseService";

const http = create();

export const getCategs = () => {
  return http.get('/all-categs')
}

export const getSubCategs = () => {
  return http.get('/sub-categs')
}

export const getMainCategs = () => {
  return http.get('/main-categs')
}

export const getAllProducts = () => {
  return http.get('/products')
}

export const createProduct = (body) => {
  return http.post('/product/create', body)
}

export const getProductPerSupp = () => {
  return http.get('/products-suppliers')
}

/* export const getProducts = (category) => {
  return http.get("/products", { params: { category: category } });
};

export const getProduct = (id) => {
  return http.get(`/products/${id}`);
};

export const editProduct = (product, id) => {
  return http.put(`/products/${id}`, product);
} */