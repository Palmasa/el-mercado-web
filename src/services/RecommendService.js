import { create } from "./BaseService";

const http = create();

/* Categs ------------------------------------ */

export const getBuyAgain = (clientId) => { // OKKK
  return http.get(`/products-buy-again/${clientId}`)
} // todos OJO ESTÉN ACTIVE O NO y si no tiene compras ({message: 'No sales'})

export const getRecommendSupplier = (supplierId) => {
  return http.get(`/products-to-recommend-supplier/${supplierId}`)
} // Llegan todos ya shuffled

export const getRecommendRelated = (category) => {
  return http.get("/products-to-recommend-related", { params: { categ: category } })
} // llegan 15 shuffled que llegan al cliente

export const getBestSellers = () => { // OKKK
  return http.get("/products-best-sellers")
} // trodos los productos ordenados por n de ventas. Si hay zip -> 
// llegan ordenados y con un campo noSend: true o noSend: false

