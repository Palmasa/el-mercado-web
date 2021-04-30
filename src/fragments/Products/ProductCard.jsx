import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import './ProductCard.scss'

const notify = (value) => toast( value + ' añadido a la bolsa');

const ProductDetail = ({ product }) => {
  const { addItemToCart } = useContext(CartContext)
  
  const addItem = () => {
    addItemToCart(product.id)
    notify(product.name)
  }

  return (
    <div>
      <img src={product.img[0]} alt={product.name} />
      <p>{product.name}</p>
      <button onClick={addItem}>Añadir al carrito</button>
      <button>Vista rápida</button>
      <Toaster />
    </div>
  )
}

export default ProductDetail
