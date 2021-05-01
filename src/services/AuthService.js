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

// -------------------------------------------------

export const suppLogin = (body) => {
  return http.post('/vendors/login', body)
}

export const suppRegister = (body) => {
  return http.post('/vendors/registration', body)
}

export const suppActivate = (token) => {
  return http.get(`/vendors/activate/${token}`)
}