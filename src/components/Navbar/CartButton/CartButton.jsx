import './CartButton.scss'
import { BsBag } from 'react-icons/bs'
import { IconContext } from "react-icons"

const CartButton = () => {
  return (
    <IconContext.Provider value={{ size: "1.1em" }}>
      <div className="CartButton">
        <p><BsBag style={{sixe: '2em'}}/></p>
      </div>
    </IconContext.Provider>
  )
}

export default CartButton
