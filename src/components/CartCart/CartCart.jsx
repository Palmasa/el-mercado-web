import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import useWindowDimensions from '../../hooks/useWindow'
import { FiTruck } from 'react-icons/fi'
import { BsPlus } from 'react-icons/bs'
import { VscDash } from 'react-icons/vsc'
import { MdClose } from 'react-icons/md'
import { cashConverter } from '../../helpers/priceConverter'
import './CartCart.scss'

const CartCart = ({ eachCart }) => {
  const { removeItem, sumQ, substractQ } = useContext(CartContext)
  const { width } = useWindowDimensions()

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
    <div className={`CartCart container p-3 ${ width < 640 && "CartCart-xs"}`}>
    <div className="row mb-4 justify-content-center align-items-center">
      <div className="col">
        <h5>{eachCart[0].supplier}</h5>
      </div>
      <div className="col">
      <div className="container">
        <div className="row justify-content-end">
          <p className="sendPrice"> <FiTruck /> {cashConverter(eachCart[0].sendPrice)}€</p>
        </div>
        <div className="row justify-content-end">
          <p style={{marginBottom: 0}}><small>{eachCart[0].sendTime}</small></p>
        </div>
      </div>
      </div>
    </div>
    <div className="container w-100">
    {
        eachCart.map((product) => (
        <div className="row justify-content-between" key={product._id}>
          <div className="col-2 p-0">
            <img src={product.img} alt={product.name} style={{width: 45}}/>
          </div>
          <div className="col-4 p-0">
            <p>{product.name}</p>
          </div>
          <div className="col- p-0">
            <button className="button-cart-mini" onClick={() => less(product.product)}><VscDash /></button>
          </div>
          <div className="col- p-0">
            <p>x0{product.quantity} </p>
          </div>
          <div className="col- p-0">
            <button className="button-cart-mini" onClick={() => plus(product.product)}><BsPlus /></button>
          </div>
          <div className="col- p-0">
            <p>{cashConverter(product.price)} €</p>
          </div>
          <div className="col- p-0">
            <button className="button-cart-mini" onClick={() => deleteItem(product.product)}><MdClose /></button>
          </div>
        </div>
      ))
    } 
    </div>
    </div>
  )
}

export default CartCart
