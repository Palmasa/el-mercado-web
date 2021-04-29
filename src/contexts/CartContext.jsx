import { createContext, useState, useEffect } from 'react'
import { getCartfromBack, createAddCart, deletCart, removeEntireItem, substractQuantity, sumQuantity } from '../services/CartService'
import { getCart, removeCart, setCart } from '../store/cartStore'

export const CartContext = createContext()

export function CartContextProvider({children}) {
  const [ stateCart, setStateCart ] = useState(null)

  const getCurrentCart = async () => {
    const cart = await getCartfromBack()
    setStateCart(cart)
  }
  useEffect(() => {
    if (getCart()) {
      getCurrentCart()
    }
  }, [])

  const addItemToCart = (productId) => {
    createAddCart(productId) // petición al back
    .then((cart) => {
      if (cart.newCart) { // || localStorage.getItem('cart') !== null
        setCart(cart.cart.id)
      }
      setStateCart(cart.cart) // el carrito entero y tengo acceso a el desde cualquier parte
    })
    .catch((error) => console.log(`FROOOONT productCart. error -> ${error.response?.data.errors.zip}`))
  }

  const removeItem = async (productId) => {
    const cart = await removeEntireItem(productId)
    if (cart === 'Carrito eliminado') {
      removeCart()
      setStateCart(null)
    } else {
      setStateCart(cart)
    }
  }

  const value = { stateCart, getCurrentCart, addItemToCart, removeItem }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}




/* const removeItem = async (productId) => {
    const cart = await removeEntireItem(productId)
    if (cart === 'Carrito eliminado') {
      removeCart()
      setStateCart(null)
    } else {
      setStateCart(cart)
    }
  }

  const sumQ = async (productId) => {
    const cart = await sumQuantity(productId)
    setStateCart(cart)
  }

  const substractQ = async (productId) => {
    const cart = await substractQuantity(productId)
    setStateCart(cart)
  }

  const removeAllCart = async () => {
    deletCart() // back
    removeCart() // front
    setStateCart(null)
  } */