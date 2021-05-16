import { useContext, useEffect, useCallback, useRef } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { MdClose } from 'react-icons/md'
import useWindowDimensions from '../../hooks/useWindow'
import { removeDuplicates } from '../../helpers/removeDuplicates'
import { cashConverter } from '../../helpers/priceConverter'
import './CartPopUp.scss'
import CartCart from '../CartCart/CartCart'
import { Link } from 'react-router-dom'

const CartPopUp = ({ closeCart, productsQuantity }) => {
  const { stateCart } = useContext(CartContext)
  const modal = useRef(null);
  const { width } = useWindowDimensions()

  window.onclick = (event) => {
    if (event.target === modal.current) {
      closeCart()
    }
  }
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

      return (
      <>
       {carts}
      <div className="text-right w-100 pr-3 my-4">
        <h5>Total: {cashConverter(stateCart.total)}€</h5>
      </div>
      <Link to="/tramitar-pedido" className="button-tramitar-pedido text-center">Tramitar pedido</Link>
      </>
      )

    }, [stateCart]
  )

  useEffect(() => {
    paintCarts()
  }, [paintCarts])


  return (
    <div ref={modal} className="overlay">
      <div className={`popUp ${ width < 640 && "popUp-xs"}`}>
        <div className="container-fluid pr-0 mb-3">
        <div className="buttonContainerCart row">
          <div className="close-popup">
            <button onClick={() => closeCart()}> <MdClose /></button>
          </div>
          <div className="text-right">
            <p style={{marginBottom: 0, paddingTop: 3}}>Bolsa ({productsQuantity})</p>
          </div>
        </div>
        </div>
        <>
          {paintCarts()}
        </>
      </div>
    </div>
  )
}

export default CartPopUp
