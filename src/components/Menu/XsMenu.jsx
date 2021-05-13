import { useRef, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { UserContext } from '../../contexts/UserContext'
import './XsMenu.scss'

const XsMenu = ({ closeMenu }) => {
  const { user } = useContext(UserContext)
  const modal = useRef(null);

  window.onclick = (event) => {
    if (event.target === modal.current) {
      closeMenu()
    }
  }

  return (
    <div ref={modal} className="overlayMenu">
      <div className="popUpMenu">
        <div className="close-menu">
          <button onClick={() => closeMenu()}> <MdClose /></button>
        </div>
        <NavLink className="navlink" activeClassName="navselect" to="/productos">Productos</NavLink>
        <NavLink className="navlink" activeClassName="navselect" to="/tiendas">Tiendas</NavLink>
        {
          user 
          ? (
            <>
            <NavLink to="/area-privada-usuarios" className="navlink" activeClassName="navselect">Mi área</NavLink>
            </>
          ) : (
            <NavLink className="navlink" activeClassName="navselect" to="/acceso-usuarios">Login</NavLink>
          )
        }
      </div>
    </div>
  )
}

export default XsMenu
