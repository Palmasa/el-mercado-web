import './Menu.scss'
import { BsPerson } from 'react-icons/bs'
import useOffSet from '../../../hooks/useOffSet'
import CartButton from "../CartButton/CartButton"

const Menu = () => {
  const offset = useOffSet()

  return (
    <div className="Menu">
      <div className="changeMe">
        <button>Charchutería</button>
        <button>Quesería</button>
        <button>Dulces</button>
        <button>Panadería</button>
        <button>De la huerta</button>
        <button>Conservas</button>
        <button>Ibéricos</button>
        <button>Panadería</button>
        <button>De la huerta</button>
      </div>
      <div className="changeMe">
        { offset > 130
          ? <CartButton />
          : (<>
            <BsPerson />
            <button>Login</button>
            </>
            )
        }
      </div>
    </div>
  )
}

export default Menu
