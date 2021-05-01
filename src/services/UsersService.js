import { create } from './BaseService'

const http = create()

export const getUserInfo = () => {
  return http.get('/users/me')
}

export const editUsers = (body) => {
  return http.post('/editar-usuarios', body)
}

export const editEmail = (body) => {
  return http.post('/editar-usuarios-email', body)
}

export const editActivateEmail = (token) => {
  return http.get(`/activate-new-user-email/${token}`)
}

export const editPass = (body) => {
  return http.post('/editar-usuarios-pass', body)
}

export const editActivatePass = (token) => {
  return http.get(`/activate-new-user-pass/${token}`)
}

export const deleteUser = () => {
  return http.delete('/eliminar-cuenta-permanente')
}

// Ventas ---------------------------------------------

export const createSale = (body) => {
  return http.post('/procesar-venta', body)
}

export const cancelSale = (saleId) => {
  return http.get(`/cancelar-venta-usuarios/${saleId}`)
}

export const getUserSales = () => {
  return http.get('/ventas-usuarios')
}