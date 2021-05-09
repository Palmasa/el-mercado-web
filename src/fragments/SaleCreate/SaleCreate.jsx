import { useContext, useEffect, useCallback, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'
import { removeDuplicates } from '../../helpers/removeDuplicates'
import { cashConverter } from '../../helpers/priceConverter'
import CartCart from '../../components/CartCart/CartCart'
import Auth from '../auth/Auth'
import StripeTest from './StripeTest'
import AddressSale from './AddressSale'

const SaleCreate = () => {
  const { user } = useContext(UserContext)
  const { stateCart } = useContext(CartContext)
  const [ toPay, setToPay ] = useState(0)
  const [ stepOne, setStepOne ] = useState(true)

  /* --- ORDENAR CARRITO --------------------------- */
  const paintCarts = useCallback(
    () => {
      const allSuppliers = []
      stateCart?.products.map((product) => allSuppliers.push(product.supplierId))
      const suppliers = removeDuplicates(allSuppliers)
      const carts = []
      for (let i = 0; i < suppliers.length; i++) {
        let eachCart = stateCart?.products.filter((product) => (product.supplierId).toString() ===  (suppliers[i]).toString())
        
        carts.push( <CartCart eachCart={eachCart} key={i}/> )
      }
      return (
        <>
        <h4 className="mb-4 pl-2">Bolsa de la compra</h4>
         {carts}
        <div className="text-right w-100 pr-1 my-4">
          <h5>Total: {cashConverter(stateCart?.total)}€</h5>
        </div>
        </>
        )
    }, [stateCart],
  )

  useEffect(() => {
    paintCarts()
  }, [paintCarts])

  return (
    <div className="container p-3">
    {
      stepOne
      ? (
      <div className="row">
      <div className="col mt-4 mr-2">
        {paintCarts()}
      </div>
      <div className="col">
        { 
          user
          ? (
            <div className="container mt-3">
            <h4>Dirección de entrega</h4>
            <AddressSale nextStep={setStepOne} toPay={setToPay} />
            </div>
          )
          : (
            <Auth shoppingBag={true}/>
          )
        
        }
      </div>
      </div>
      ) : (
          <StripeTest cartTotal={toPay}/>
      )
    }
    </div>
  )
}

export default SaleCreate
