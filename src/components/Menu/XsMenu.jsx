import { useRef, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { UserContext } from '../../contexts/UserContext'
import './XsMenu.scss'

const XsMenu = ({ closeMenu }) => {
  const modalMenu = useRef();
  const { user } = useContext(UserContext)

  document.onclick = (event) => {
    if (event.target === modalMenu.current) {
      closeMenu()
    }
  }

  return (
    <div ref={modalMenu} className="overlayMenu">
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
            <NavLink className="navlink" activeClassName="navselect" to="/acceso-usuarios">Iniciar sesión</NavLink>
          )
        }
      </div>
    </div>
  )
}

export default XsMenu
