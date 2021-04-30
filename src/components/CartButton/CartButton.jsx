import { useContext, useState } from 'react'
import { BsBag } from 'react-icons/bs'
import { IconContext } from "react-icons"
import { CartContext } from '../../contexts/CartContext'
import './CartButton.scss'
import CartPopUp from '../CartPopUp/CartPopUp'

const CartButton = () => {
  const { stateCart } = useContext(CartContext)
  const [ showCart, setShowCart ] = useState(false)

  const openCart = () => {
    setShowCart(true)
  }

  const closeCart = () => {
    setShowCart(false)
  }

  return (
    <IconContext.Provider value={{ size: "1.2em" }}>
    <>
      <button onClick={openCart} className="CartButton">
        <p><BsBag style={{sixe: '2em'}}/></p>
      </button>
        <div className="numOfItems">
          { stateCart && (
            <>
            <small className="circleCart"></small>
            <small className="numCart">{stateCart.products?.length}</small>
            {
              showCart && (<CartPopUp closeCart={closeCart}/>)
            }
            </>
          ) }
        </div>
    </>
    </IconContext.Provider>
  )
}

export default CartButton
