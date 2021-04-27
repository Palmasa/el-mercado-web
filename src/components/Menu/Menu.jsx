import { NavLink } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'
import MenuItem from '../MenuItem/MenuItem'
import './Menu.scss'

const Menu = () => {

  return (
    <div className="Menu">
      <div className="Navlinks">

        <MenuItem route="/productos">
          Productos
        </MenuItem>

        <MenuItem route="/puestos">
          Puestos
        </MenuItem>

        
        <NavLink className="navlink" activeClassName="navselect" to="/mapa">Mapa</NavLink>
        <NavLink className="navlink" activeClassName="navselect" to="/mas-vendidos">Los más vendidos</NavLink>
      </div>
      <div className="changeMe">
            <BsPerson />
            <button>Login</button>
      </div>
    </div>
  )
}

export default Menu
