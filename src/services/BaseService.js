import axios from "axios";
import { getAccessToken, logout } from '../store/accessTokenStore'
import { getCart } from "../store/cartStore";
import { getZip } from "../store/zipStore";

export const create = (opts = () => {}) => {
  const http = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`,
    ...opts
  });

  http.interceptors.request.use(req => {

    if (opts.useAccessToken !== false) {
      req.headers.common.Authorization = `Bearer ${getAccessToken()}`
    } else {
      delete req.headers.common.Authorization
    }

    if (localStorage.getItem('zip') !== null) {
      req.headers.common.zip = getZip()
    } else {
      delete req.headers.common.zip
    }

    if (opts.useCart !== false) {
      req.headers.common.cart = getCart()
    } else {
      delete req.headers.common.cart
    }

    return req
  })

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (
        opts.reloadOnUnathorized &&
        error.response &&
        [401, 403].includes(error.response.status)
      ) {
        logout();
      }

      return Promise.reject(error);
    }
  );

  return http
}