import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SuppContext } from '../../contexts/SuppContext'
import logo from '../../images/logos/WHITE.png'
import './SuppNavbar.scss'

const SuppNavbar = () => {
  const { supp } = useContext(SuppContext)


  return (
    <div className="SuppNavbar">
      <Link to="/area-tiendas"><img src={logo} alt="El Mercado" style={{width: 100}}/></Link>
      {supp 
      ? (
        <div className="suppLinks">
          <NavLink to="/administrador-tiendas">Administrador</NavLink>
          <NavLink to="/productos-tiendas">Productos</NavLink>
          <NavLink to="/envios-tiendas">Modelos de envío</NavLink>
        </div>
      ) : ( 
        <div className="suppLinks">
          <NavLink to="/registro-tiendas">Registro</NavLink>
          <NavLink to="/acceso-tiendas">Acceso</NavLink>
        </div>
      )
      }
    </div>
  )
}

export default SuppNavbar
