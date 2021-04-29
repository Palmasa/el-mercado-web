import { create } from './BaseService'

const http = create({
  useAccessToken: false
})

export const login = (body) => {
  return http.post('/login', body)
}

export const register = (body) => {
  return http.post('/registration', body)
}

export const activate = (token) => {
  return http.get(`/activate/${token}`)
}