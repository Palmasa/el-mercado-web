import { useContext, useEffect, useCallback, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'
import { ZipContext } from '../../contexts/ZipContext'
import { removeDuplicates } from '../../helpers/removeDuplicates'
import { createRealSale } from '../../services/SaleService'
import CartCart from '../../components/CartCart/CartCart'
import Login from '../auth/Login'
import StripeTest from './StripeTest'

const SaleCreate = () => {
  const { user } = useContext(UserContext)
  const { stateCart } = useContext(CartContext)
  const { stateZip } = useContext(ZipContext)
  const [toPay, setToPay] = useState(0)
  const [ stepOne, setStepOne ] = useState(true)

  const [ state, setState ] = useState ({
    fields: {
      city: user?.address.city || '',
      street: user?.address.street || '',
      number: user?.address.number || '',
      block: user?.address.block || '',
      zip: user?.address.zip || '28000'
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})

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
      return <>{carts}<p>Total: {(stateCart?.total)/100}€</p></>
    }, [stateCart],
  )

  const onSubmit = (e) => {
    e.preventDefault()

    createRealSale({ 
      city: state.fields.city,
      street: state.fields.street,
      number: state.fields.number,
      block: state.fields.block,
      zip: 28000
    })

    .then((res) => {
      let total = (res.toPay) / 100
      setToPay(total)
      setStepOne(false)
    })
    .catch((e) => {
      setResError({ error: true, info: e.response.data.errors })
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setResError({ error: false })
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      }
    }))
  }

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
            <div className="container">
            <small>
            Si desea cambiar la provincia de la direrrión de entrega se 
            necesita realizar una revisión de la bolsa introduciendo el código postal
            correspondiente
            </small>
            <form onSubmit={onSubmit}>

            <div className="mt-3">
                <div className="">
                  <label htmlFor="zip">
                    Provincia
                  </label>
                </div>
                <div className="">
                  <input
                    name="zip"
                    value={stateZip}
                    disabled = {true}
                  />
                </div>
              </div>

              <div className="">
                <div className="">
                  <label htmlFor="city">
                    Ciudad
                  </label>
                </div>
                <div className="">
                  <input
                    name="city"
                    value={state.fields.city}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="">
                <div className="">
                  <label htmlFor="street">
                    Calle / Vía
                  </label>
                </div>
                <div className="">
                  <input
                    name="street"
                    value={state.fields.street}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="">
                <div className="">
                  <label htmlFor="number">
                    Número
                  </label>
                </div>
                <div className="">
                  <input
                    name="number"
                    value={state.fields.number}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="">
                <div className="">
                  <label htmlFor="block">
                    Bloque / Piso
                  </label>
                </div>
                <div className="">
                  <input
                    name="block"
                    value={state.fields.block}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                {resError.error ? resError.info : ""}
              </div>

              <button>Realizar pago</button>

            </form>
            </div>
          )
          : (<Login />)
        
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
