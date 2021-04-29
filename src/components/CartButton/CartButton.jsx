import './CartButton.scss'
import { BsBag } from 'react-icons/bs'
import { IconContext } from "react-icons"
import { useEffect, useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

const CartButton = () => {
  const { stateCart } = useContext(CartContext)

  return (
    <IconContext.Provider value={{ size: "1.2em" }}>
      <div className="CartButton">
        <p><BsBag style={{sixe: '2em'}}/></p>
        { stateCart ? (<small style={{ margin: 0, padding: 0 }}>{stateCart.products?.length}</small>) : (<small style={{ margin: 0, padding: 0 }}>0</small>) }
      </div>
    </IconContext.Provider>
  )
}

export default CartButton
