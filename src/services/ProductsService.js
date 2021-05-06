import { create } from "./BaseService";

const http = create();

/* Categs ------------------------------------ */
export const getCategs = () => {
  return http.get('/all-categs')
}

export const getSubCategs = () => {
  return http.get('/sub-categs')
}

export const getMainCategs = () => {
  return http.get('/main-categs')
}

/*  GET  ------------------------------ */
/* ALL */
export const getAllProducts = () => {
  return http.get('/products')
}
/*  ONE */
export const getOneProduct = (productId) => {
  return http.get(`/products/${productId}`)
}

/*  persupp */
export const getProductPerSupp = () => {
  return http.get('/products-suppliers')
}
 /* Boosted */
export const getProductsBoosted = () => {
  return http.get('/products/boosted')
}

/*  CREATE UPDATE DELETE PRODUCTS ----------------------- */
export const createProduct = (body) => {
  return http.post('/product/create', body)
}

export const updateProducts = (productId, body) => {
  return http.patch(`/product/update/${productId}`, body)
}

export const desactivateProducts = (productId) => {
  return http.patch(`/product/desactivate/${productId}`)
}

export const reactivateProducts = (productId, body) => {
  return http.post(`/product/reactivate/${productId}`, body)
}

export const boostProduct = (productId, body) => {
  return http.post(`/product/boost/${productId}`, body)
}

export const deleteProduct = (productId) => {
  return http.delete(`/product/boost/${productId}`)
}