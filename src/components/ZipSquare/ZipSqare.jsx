import { useState, useContext } from 'react'
import { CartContext } from '../../contexts/CartContext';
import { ZipContext } from '../../contexts/ZipContext';
import { sendZipBack } from '../../services/ZipService';
import { setCart } from '../../store/cartStore';
import { setZip } from '../../store/zipStore';
import toast, { Toaster } from 'react-hot-toast';
import './ZipSqare.scss'

const notify = (value) => toast(value);
const NUMBERS_MATCH = /^[0-9]*$/

const validators = {
  zip: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir un código postal'
    } else if (!NUMBERS_MATCH.test(value)) {
      message = 'El código postal conriene cinco números'
    }
    return message
  }
}
// Component ZipSquare ------------------------------------------------------
const ZipSqare = ({ closeSquare }) => {
  const { getCurrentZip } = useContext(ZipContext)
  const { getCurrentCart, removeAllCart } = useContext(CartContext)
  const [ state, setState ] = useState ({
    fields: {
      zip: '',
    },
    errors: {
      zip: validators.zip,
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})

  const isValid = () => {
    const { errors } = state
    return !Object.keys(errors).some(e => errors[e])
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (isValid()) {
      sendZipBack(state.fields)
      .then((response) => {
        setZip(response.zDec)
        getCurrentZip()
        if (response.cartUpdated) {
          // JFK -> CUANDO TENGAS PRODUCTOS PROBAR - NOT TESTED
          // MIRAR EN EL BACK EN ZIP CONTROLER LINEA 20 y 50
          setCart(response.cartUpdated)
          getCurrentCart()
          console.log(response.deletedItems)
        } else if (response.message) {
          if (response.message === "Su cesta ha sido eliminada") {
            removeAllCart()
            notify('Su bolsa se ha eliminado')
          } else {
            notify('Todos los productos de su bolsa llegan a su destino')
          }
        }
      })
      .catch((error) => {
        setResError({ error: true, info: error.response.data.message })
      })
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setResError({ error: false })
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: validators[name] && validators[name](value)
      }
    }))
  }

  return (
    <div className="ZipSquare">
      <button onClick={() => closeSquare(false)}> x </button>
      <form onSubmit={onSubmit} >
        <input
          name="zip"
          value={state.fields.zip}
          onChange={onChange} 
        />
        <div>
          {state.errors.zip}
          {resError.error ? resError.info : ""}
        </div>
        <button type="submit">send zip</button>
      </form>
      <Toaster />
    </div>
  )
}

export default ZipSqare
