import { logout } from '../../store/AccessTokenStore.js'
import { removeZip } from '../../store/zipStore'
import './AreaHover.scss'

const AreaHover = ({ toggle, name }) => {
  const toggleOut = () => {
    toggle(false)
  }

  const toggleIn = () => {
    toggle(true)
  }

  const eraseUser = () => {
    logout()
    removeZip()
  }

  return (
      <div 
    className="AreaHover"
    onMouseEnter={toggleIn}
    onMouseLeave={toggleOut}
    >
    <p>¡Hola {name}!</p>
    <p>Mis pedidos</p>
    <p>Mi cuenta</p>
    <button onClick={eraseUser}>Salir</button>
    </div>
  )
}

export default AreaHover