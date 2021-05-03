import { create } from './BaseService'

const http = create()

export const createShipping = (body) => {
  return http.post('/create-shipping', body)
}