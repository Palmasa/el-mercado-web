import { create } from "./BaseService";

const http = create();

export const createRealSale = (body) => {
  return http.post('/procesar-venta', body)
}

export const payRealSale = (body) => {
  return http.post('/checkout', body)
}

export const sendEmailSale = (body) => {
  return http.post('/send-sale-email', body)
}

export const userCancelSale = (saleID) => {
  return http.get(`/cancelar-venta-usuarios/${saleID}`)
}

export const changeSaleSupp = (saleID, body) => {
  return http.post(`/modificar-estado-venta-vendors/${saleID}`, body)
}

export const doneSales = () => {
  return http.get(`/ventas-vendors`)
}

export const onGoingSales = () => {
  return http.get('/ventas-en-curso-vendors')
}