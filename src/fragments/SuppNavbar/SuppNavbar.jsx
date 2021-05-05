import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SuppContext } from '../../contexts/SuppContext'
import { logout } from '../../store/AccessTokenStore'

import { IconContext } from "react-icons"
import { RiLogoutBoxLine} from 'react-icons/ri'
import logo from '../../images/logos/WHITE.png'
import './SuppNavbar.scss'

const SuppNavbar = () => {
  const { supp } = useContext(SuppContext)


  return (
    <div className="SuppNavbar">
      {
        supp 
      ? (
        <>
        <div className="container-logo-together">
          <Link to="/area-tiendas"><img src={logo} alt="El Mercado" style={{width: 95}}/></Link>
          <h6>{supp?.name}</h6>
        </div>
        <div className="suppLinks">
          <NavLink to="/administrador-tiendas"
            activeClassName="navLinkSuppSelected"
            className="navLinkSupp"
          >
            Administrador
          </NavLink>
          <NavLink to="/productos-tiendas"
            activeClassName="navLinkSuppSelected"
            className="navLinkSupp"
          >
            Productos
          </NavLink>
          <NavLink to="/envios-tiendas"
            activeClassName="navLinkSuppSelected"
            className="navLinkSupp"
          >
            Modelos de envío
          </NavLink>
          <IconContext.Provider value={{ color: '#f9f8f6' }}>
            <button
            className="logoutSuppNavbar"
              onClick={logout}
            ><RiLogoutBoxLine/> </button>
          </IconContext.Provider>
        </div>
        </>
      ) : ( 
        <>
        <Link to="/area-tiendas"><img src={logo} alt="El Mercado" style={{width: 100}}/></Link>
        <div className="suppLinks">
          <NavLink to="/registro-tiendas" 
            activeClassName="navLinkSuppSelected"
            className="navLinkSupp">
            Registro
          </NavLink>

          <NavLink to="/acceso-tiendas"
            activeClassName="navLinkSuppSelected"
            className="navLinkSupp"
          >
            Acceso
          </NavLink>
        </div>
        </>
      )
      }
    </div>
  )
}

export default SuppNavbar
