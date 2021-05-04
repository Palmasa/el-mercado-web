import { useContext, useEffect, useCallback, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'
import { removeDuplicates } from '../../helpers/removeDuplicates'
import CartCart from '../../components/CartCart/CartCart'
import { createRealSale } from '../../services/SaleService'
import Login from '../auth/Login'
import StripeTest from './StripeTest'

const SaleCreate = () => {
  const { user } = useContext(UserContext)
  const { stateCart } = useContext(CartContext)
  const [toPay, setToPay] = useState(0)
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
      return <>{carts}<p>Total: {stateCart?.total}€</p></>
    }, [stateCart],
  )

  const onSubmit = (e) => {
    e.preventDefault()

    createRealSale({ city: 'Madrid', street: 'Dalia', number: 4, block: '3rodercha', zip: 28109 })
    .then((res) => {
      setToPay(res.toPay)
      setStepOne(false)
      console.log(res.allSales)
    })
    .catch((e) => console.log(e))
  }

    /* CUANDO CREO LA VENTA LE LLEGA DEL BACK .json({allSales, toPay: finalPriceTotal }),
     ESO LO MANDO AL CONTROLADOR DE STRIPE EN EL AMMOUNT ()*/
  useEffect(() => {
    paintCarts()
  }, [paintCarts])

  return (
    <div className="container p-3">
    {
      stepOne
      ? (
      <div className="row">
      <div className="col">
        {paintCarts()}
      </div>
      <div className="col">
        { 
          user
          ? (
            <>
            <b>Form con la dirección!</b>
            <button onClick={onSubmit}>Realizar el pago</button>
            </>
          )
          : (<Login />)
        
        }
      </div>
      </div>
      ) : (
          <StripeTest cartTotal={toPay} />
      )
    }
    </div>
  )
}

export default SaleCreate
