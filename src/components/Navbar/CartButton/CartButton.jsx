import './CartButton.scss'
import cart from '../../../images/utils/cart.png'
import { BsBag } from 'react-icons/bs'

const CartButton = () => {
  return (
    <div className="CartButton">
      {/* <img src={cart} alt="Bolsa de la compra"/> */}
      <p><BsBag/></p>
    </div>
  )
}

export default CartButton
