import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'


import './ProductCard.scss'

const ProductDetail = ({ product }) => {
  const { addItemToCart, removeItem } = useContext(CartContext)
  
  const addItem = () => {
    addItemToCart(product.id)
  }

  const deleteItem = () => {
    removeItem(product.id)
  }

  return (
    <div>
      <img src={product.img[0]} alt={product.name} />
      <p>{product.name}</p>
      <button onClick={addItem}>Añadir al carrito</button>
      <button onClick={deleteItem}>Vista rápida</button>
    </div>
  )
}

export default ProductDetail
