import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartContextProvider({children}) {
  const [ cart, setCart ] = useState(null)

  // petición al back para conseguir el carrito/me
  // petición al back para cambiar el carrito
  // NO hay que cambiar el carrito en la linea 6 ya que es el id del carrito

  const value = { cart, setCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}