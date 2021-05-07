import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { FiTruck } from 'react-icons/fi'
import { BsPlus } from 'react-icons/bs'
import { VscDash } from 'react-icons/vsc'
import { MdClose } from 'react-icons/md'
import { cashConverter } from '../../helpers/priceConverter'
import './CartCart.scss'

const CartCart = ({ eachCart }) => {
  const { removeItem, sumQ, substractQ } = useContext(CartContext)

  const deleteItem = (productId) => {
    removeItem(productId)
  }

  const plus = (productId) => {
    sumQ(productId)
  }

  const less = (productId) => {
    substractQ(productId)
  }

  return (
    <div className="CartCart">
    <p>{eachCart[0].supplier}</p>
      {
        eachCart.map((product) => (
        <div className="eachProduct" key={product.id}>
          <img src={product.img} alt={product.name} />
          <small>{product.sendTime}</small>
          <p>{product.name}</p>

          <button onClick={() => less(product.product)}><VscDash /></button>
          <p>x0{product.quantity} </p>
          <button onClick={() => plus(product.product)}><BsPlus /></button>

          <p>{cashConverter(product.price)}€</p>

          <button onClick={() => deleteItem(product.product)}><MdClose /></button>
        </div>
      ))
      } 
      <p className="sendPrice"> <FiTruck /> Precio del envío {cashConverter(eachCart[0].sendPrice)}€</p>

    </div>
  )
}

export default CartCart
