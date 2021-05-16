import { useContext, useState } from 'react'
import { BsBag } from 'react-icons/bs'
import { IconContext } from "react-icons"
import { CartContext } from '../../contexts/CartContext'
import useWindowDimensions from '../../hooks/useWindow'
import './CartButton.scss'
import CartPopUp from '../CartPopUp/CartPopUp'

const CartButton = () => {
  const { stateCart } = useContext(CartContext)
  const { width } = useWindowDimensions()
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
        <p><BsBag style={{sixe: '2em', padding: 0}}/></p>
      </button>
        <div className="numOfItems">
          { stateCart && (
            <>
            <small className={`circleCart ${ width > 640 ? "position-circle" : "xs-position-circle"}`} onClick={openCart}></small>
            <small className={`numCart ${ width > 640 ? "position-num" : "xs-position-num"}`} onClick={openCart}>{stateCart.products?.length}</small>
            {
              showCart && (<CartPopUp closeCart={closeCart} productsQuantity={stateCart.products?.length}/>)
            }
            </>
          ) }
        </div>
    </>
    </IconContext.Provider>
  )
}

export default CartButton
