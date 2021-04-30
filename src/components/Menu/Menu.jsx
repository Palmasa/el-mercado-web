import { useContext, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'

import { UserContext } from '../../contexts/UserContext'
import { getMainCategs } from '../../services/ProductsService'
import MenuItem from '../MenuItem/MenuItem'
import AreaItem from '../AreaItem/AreaItem'
import './Menu.scss'

const Menu = () => {
  const { user } = useContext(UserContext)
  const [productCategs, setProductCategs] = useState([])

  const getProductCategs = () => {
    getMainCategs()
    .then((response) => {
      setProductCategs(response)
    })
  }

  useEffect(() => {
    getProductCategs()
  }, [])

  return (
    <div className="Menu">
      <div className="Navlinks">

        <MenuItem route="/productos" categs={productCategs}>
          Productos
        </MenuItem>

        <MenuItem route="/puestos" categs={productCategs}>
          Puestos
        </MenuItem>
        
        <NavLink className="navlink" activeClassName="navselect" to="/mapa">Mapa</NavLink>
        <NavLink className="navlink" activeClassName="navselect" to="/mas-vendidos">Los más vendidos</NavLink>
      </div>
      <div className="changeMe">
        {
          user 
          ? (
            <>
            <AreaItem route="/area-privada-usuarios" name={user.name ? user.name : ""}>Mi área</AreaItem>
            </>
          ) : (
            <>
            <BsPerson />
            <Link to="/acceso-usuarios">Login</Link>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Menu
