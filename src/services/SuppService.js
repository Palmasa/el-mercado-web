import { create } from './BaseService'

const http = create()

export const getSuppInfo = () => {
  return http.get('/vendors/me')
}

export const getAllShippings = () => {
  return http.get('/get-all-shippings')
}

export const deleteShipping = (shippId) => {
  return http.delete(`/delete-shipping/${shippId}`)
}