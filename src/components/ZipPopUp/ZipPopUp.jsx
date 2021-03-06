import { useState, useContext, useRef } from 'react'
import { CartContext } from '../../contexts/CartContext';
import { ZipContext } from '../../contexts/ZipContext';
import { sendZipBack } from '../../services/ZipService';
import { setZip } from '../../store/zipStore';
import { MdClose } from 'react-icons/md'
import useWindowDimensions from '../../hooks/useWindow'
import cart_image from '../../images/car_empty.png'
import './ZipPopUp.scss'

const NUMBERS_MATCH = /^[0-9]*$/

const validators = {
  zip: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir un código postal'
    } else if (!NUMBERS_MATCH.test(value)) {
      message = 'El código postal contiene cinco números'
    }
    return message
  }
}
// Component ZipPopUp ------------------------------------------------------
const ZipPopUp = ({ closeSquare }) => {
  const results = useRef(null)
  const { width } = useWindowDimensions()
  const { getCurrentZip } = useContext(ZipContext)
  const { stateCart, getCurrentCart, removeAllCart } = useContext(CartContext)
  const [ state, setState ] = useState ({
    fields: {
      zip: '',
    },
    errors: {
      zip: '',
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})
  const [ response, setResponse ] = useState(false)
  const [ message, setMessage ] = useState('')

  const isValid = () => {
    const { errors } = state
    return !Object.keys(errors).some(e => errors[e])
  }

  window.onclick = (event) => {
    if (event.target === results.current) {
      closeSquare(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (isValid()) {
      sendZipBack(state.fields)
      .then((response) => {
        setZip(response.zDec)
        getCurrentZip()
        if (response.cartUpdated) {
          getCurrentCart()
          let names = []
          response.deletedItems?.map((p) => (
            names.push(p.name)
          ))
          setMessage(`
          Se han eliminado ${response.deletedItems?.length} productos de su bolsa: ${names.join(',')}`)
          setResponse(true)
        } else if (response.message) {
          if (response.message === "Su cesta ha sido eliminada") {
            removeAllCart()
            setMessage('Su bolsa se ha eliminado')
            setResponse(true)
          } else {
            setMessage('¡Todos los productos de su bolsa llegan a su destino!')
            setResponse(true)
          }
        } else {
          closeSquare(false)
        }
        
      })
      .catch((error) => {
        setResError({ error: true, info: error.response?.data.message })
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
    <div ref={results} className="overlay-zip">
      <div className={`popUp-zip ${ width < 640 && "popUp-zip-xs"}`}>
        <div className="ZipSquare container px-3 py-2">
         <button onClick={() => closeSquare(false)}> <MdClose /> </button>
          { 
            response
            ? (
              <div className="px-5 py-4 row justify-content-center text-center">
                <img alt="cart" src={cart_image} style={{width: 55}} className="mb-2"/>
                <p>{message}</p>
              </div>
            ) : (
            <form onSubmit={onSubmit} >
            <h6>Código postal</h6>
              <input
                name="zip"
                value={state.fields.zip}
                onChange={onChange}
                placeholder="xxxxx"
              />
              <div>
                {state.errors.zip}
                {resError.error ? resError.info : ""}
              </div>
              <button type="submit">Enviar</button>
              { stateCart && <p className="warning-zip mt-2 px-3"><small>* Su bolsa será revisada: se eliminarán los productos que no lleguen a su destino.</small></p> }
            </form>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ZipPopUp
