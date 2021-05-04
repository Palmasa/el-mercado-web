import { useContext, useEffect, useCallback } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { MdClose } from 'react-icons/md'
import useWindowDimensions from '../../hooks/useWindow'
import { removeDuplicates } from '../../helpers/removeDuplicates'
import './CartPopUp.scss'
import CartCart from '../CartCart/CartCart'
import { Link } from 'react-router-dom'

const CartPopUp = ({ closeCart, productsQuantity }) => {
  const { stateCart } = useContext(CartContext)
  const { width } = useWindowDimensions()

  /* --- ORDENAR CARRITO --------------------------- */
  const paintCarts = useCallback(
    () => {
      const allSuppliers = []
      stateCart.products.map((product) => allSuppliers.push(product.supplierId))
      const suppliers = removeDuplicates(allSuppliers)
      const carts = []
      for (let i = 0; i < suppliers.length; i++) {
        let eachCart = stateCart.products.filter((product) => (product.supplierId).toString() ===  (suppliers[i]).toString())
        
        carts.push( <CartCart eachCart={eachCart} key={i}/> )

      }

      return <>{carts}<p>Total: {stateCart.total}€</p></>

    }, [stateCart],
  )

  useEffect(() => {
    paintCarts()
  }, [paintCarts])


  return (
    <button className="overlay">
      <div className="popUp">
        <div className="buttonContainerCart">
          <button onClick={() => closeCart()}> <MdClose /></button>
          <p>Bolsa ({productsQuantity})</p>
        </div>
        <>
          {width < 640
          ? (
            <p>xs</p>
          ) : (
            <>
              {paintCarts()}
            </>
          )
          }
        </>
        <Link to="/tramitar-pedido">Tramitar pedido</Link>
      </div>
    </button>
  )
}

export default CartPopUp
