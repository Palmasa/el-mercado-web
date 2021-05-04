import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { createAddCart } from '../../services/CartService'
import { getCart, setCart } from '../../store/cartStore'

import toast, { Toaster } from 'react-hot-toast';
import './ProductCard.scss'

const notify = (value) => toast( value + ' añadido a la bolsa');
const negNotify =  (value) => toast( value );
const ProductDetail = ({ product }) => {
  const { setStateCart } = useContext(CartContext)
  
  const addItem = () => {
    createAddCart(product.id) // petición al back
    .then((cart) => {
      if (cart.newCart) { // || localStorage.getItem('cart') !== null
        setCart(cart.cart.id)
      }
      setStateCart(cart.cart) // el carrito entero y tengo acceso a el desde cualquier parte
      notify(product.name)
    })
    .catch((error) => {
      console.log(`productCart. error -> ${error.response?.data.errors.zip}`)
      negNotify('Se necesita introducir un código postal')
    })
  }

  return (
    <div>
      <img src={product.img[0]} alt={product.name} className={`${product.noSend ? "bw" : ''}`}/>
      <p>{product.name}</p>
      {
        product.noSend
        ? <button disabled={true}>Añadir al carrito</button>
        : <button onClick={addItem}>Añadir al carrito</button>
      }
      <button>Vista rápida</button>
      <Toaster />
    </div>
  )
}

export default ProductDetail
