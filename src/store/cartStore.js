let cart = window.localStorage.getItem('cart') || null

export const getCart = () => cart

export const setCart = (cartId) => {
  window.localStorage.setItem('cart', cartId)
  cart = cartId
}

export const removeCart = () => {
  window.localStorage.removeItem('cart')
}