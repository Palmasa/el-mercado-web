import { useContext, useEffect, useCallback } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { MdClose } from 'react-icons/md'
import useWindowDimensions from '../../hooks/useWindow'
import { removeDuplicates } from '../../helpers/removeDuplicates'
import './CartPopUp.scss'

const CartPopUp = ({ closeCart }) => {
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
        /* console.log(eachCart) */
        carts.push(<div style={{ border: "1px solid blue"}}>
          {
            eachCart.map((cart) => (
            (
            <div>
            <p>{cart.name}</p>
            <p>{cart.price}€</p>
            <p>x0{cart.quantity}</p>
            </div>
            )
          ))
          }
            <p>send price{eachCart[0].sendPrice}</p>

        </div>)
      }
      console.log(stateCart)
      return <>{carts}<p>{stateCart.total}€</p></>
    }, [stateCart],
  )

  useEffect(() => {
    paintCarts()
  }, [paintCarts])


  return (
    <button onClick={() => closeCart()} className="overlay">
      <div className="popUp">
        <div className="buttonContainerCart">
          <button onClick={() => closeCart()}><MdClose /></button>
        </div>
        <div>
          {width < 640
          ? (
            <p>xs</p>
          ) : (
            <>
              <p>{paintCarts()}</p>
            </>
          )
          }
        </div>
      </div>
    </button>
  )
}

export default CartPopUp
