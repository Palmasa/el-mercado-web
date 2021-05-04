import { createContext, useState, useEffect } from 'react'
import { getCartfromBack, createAddCart, deletCart, removeEntireItem, substractQuantity, sumQuantity } from '../services/CartService'
import { getCart, removeCart, setCart } from '../store/cartStore'

export const CartContext = createContext()

export function CartContextProvider({children}) {
  const [ stateCart, setStateCart ] = useState(null)

  const getCurrentCart = async () => {
    try {
      const cart = await getCartfromBack()
      setStateCart(cart)
    } catch(e) { console.log(e.response?.data) }
  }

  const addItemToCart = (productId) => {
    createAddCart(productId) // petición al back
    .then((cart) => {
      if (cart.newCart) { // || localStorage.getItem('cart') !== null
        setCart(cart.cart.id)
      }
      setStateCart(cart.cart) // el carrito entero y tengo acceso a el desde cualquier parte
    })
    .catch((error) => console.log(`FROOOONT productCart. error -> ${error.response?.data}`))
  }

  const removeItem = async (productId) => {
    try {
      const cart = await removeEntireItem(productId)
      if (cart === 'Carrito eliminado') {
        removeCart()
        setStateCart(null)
      } else {
        setStateCart(cart)
      }
    } catch(e) { console.log(`Cartcontext remove Item. error -> ${e.response?.data.errors.zip}`) }
  }

  const sumQ = async (productId) => {
    try {
      const cart = await sumQuantity(productId)
      setStateCart(cart)
    } catch(e) { console.log(e.response.data)}
  }

  const substractQ = async (productId) => {
    try {
      const cart = await substractQuantity(productId)
      setStateCart(cart)
    } catch(e) { console.log(e.response.data)}
  }

  const removeAllCart = async () => {
    try {
      deletCart() // back
      removeCart() // front
      setStateCart(null)
    } catch(e) { console.log(e.response.data)}
  }

  // ---------------------- peticion con cada render
  useEffect(() => {
    if (getCart()) {
      getCurrentCart()
    }
  }, [])


  const value = { stateCart, setStateCart, getCurrentCart, addItemToCart, removeItem, sumQ,  substractQ, removeAllCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}