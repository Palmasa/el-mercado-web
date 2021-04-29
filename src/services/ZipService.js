import { create } from './BaseService'

const http = create()

export const sendZipBack = (zip) => {
  return http.post('/create-zip', zip)
}

