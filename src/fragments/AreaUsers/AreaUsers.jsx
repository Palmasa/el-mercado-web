import { useState } from 'react'
import MyProfile from './MyProfile'
import Orders from './Orders'
import { logout } from '../../store/AccessTokenStore.js'
import { removeZip } from '../../store/zipStore'
import { GrLogout } from 'react-icons/gr'

const AreaUsers = () => {
  const [opt, setOpt] = useState(true)

  const goRegister = () => {
    setOpt(false)
  }

  const goLogin = () => {
    setOpt(true)
  }

  const eraseUser = () => {
    logout()
    removeZip()
  }

  return (
    <div className="Auth container">
      <div className="authMenu">
        <button 
          onClick={goLogin}
          className={`${opt ? "optTrue" : "" }` }
        >
        Mi cuenta
        </button>
        <button 
          onClick={goRegister}
          className={`${opt ? "" : "optTrue" }` }
        >
        Mis pedidos
        </button>
      </div>
      {
        opt
        ? <MyProfile />
        : <Orders /> 
      }
      <button onClick={eraseUser}><GrLogout /> Cerrar sesión</button>
    </div>
  )
}

export default AreaUsers