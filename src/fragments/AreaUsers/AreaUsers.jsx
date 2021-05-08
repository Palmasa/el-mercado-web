import { useState } from 'react'
import MyProfile from './MyProfile'
import Orders from './Orders'
import { logout } from '../../store/AccessTokenStore.js'
import { removeZip } from '../../store/zipStore'
import { GrLogout } from 'react-icons/gr'
import './AreaUsers.scss'

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
        Mis pedidos
        </button>
        <button 
          onClick={goRegister}
          className={`${opt ? "" : "optTrue" }` }
        >
        Mis datos
        </button>
      </div>
      {
        opt
        ? <Orders /> 
        : <MyProfile />
      }
      <div className="container my-5">
        <div className="d-flex flex-row-reverse mt-5">
          <button className="logout-users" onClick={eraseUser}><small><GrLogout /> Cerrar sesión</small></button>
        </div>
      </div>
    </div>
  )
}

export default AreaUsers