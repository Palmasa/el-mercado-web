import { create } from "./BaseService";

const http = create();

export const createRealSale = (body) => {
  return http.post('/procesar-venta', body)
}

export const payRealSale = (body) => {
  return http.post('/checkout', body)
}