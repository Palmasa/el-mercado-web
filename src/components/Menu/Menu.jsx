import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'

import { UserContext } from '../../contexts/UserContext'
import MenuItem from '../MenuItem/MenuItem'
import AreaItem from '../AreaItem/AreaItem'
import './Menu.scss'

const Menu = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="Menu">
      <div className="Navlinks">
        <MenuItem route="/categorias">
          Categorías
        </MenuItem>
        <NavLink className="navlink" activeClassName="navselect" to="/productos">Productos</NavLink>
        <NavLink className="navlink" activeClassName="navselect" to="/tiendas">Tiendas</NavLink>
      </div>
      <div className="changeMe">
        {
          user 
          ? (
            <>
            <AreaItem route="/area-privada-usuarios" name={user.name ? user.name : ""}>Mi área</AreaItem>
            </>
          ) : (
            <div className="login-text">
            <BsPerson />
            <Link className="login-text-text" to="/acceso-usuarios">Login</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Menu
