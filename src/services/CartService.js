import { create } from "./BaseService";

const http = create();

export const getCartfromBack = () => {
  return http.get(`/carrito/me`)
}

export const createAddCart = (productId) => {
  return http.get(`/crear-carrito/${productId}`)
}

export const removeEntireItem = (productId) => {
  return http.get(`/delete-item/${productId}`)
}

export const sumQuantity = (productId) => {
  return http.get(`/ajustar-cantidad-item/${productId}/add`)
}

export const substractQuantity = (productId) => {
  return http.get(`/ajustar-cantidad-item/${productId}/menos`)
}

export const deletCart = () => {
  return http.get(`/delete-carrito`)
}