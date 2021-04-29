import { useState, useEffect } from 'react'
import Login from './Login'
import Register from './Register'
import './Auth.scss'

const Auth = () => {
  const [opt, setOpt] = useState(true)

  const goRegister = () => {
    setOpt(false)
  }

  const goLogin = () => {
    setOpt(true)
  }

  return (
    <div className="Auth container">
      <div className="authMenu">
        <button 
          onClick={goLogin}
          className={`${opt ? "optTrue" : "" }` }
        >
        Ya tengo cuenta
        </button>
        <button 
          onClick={goRegister}
          className={`${opt ? "" : "optTrue" }` }
        >
        Registrarme
        </button>
      </div>
      {
        opt
        ? <Login />
        : <Register /> 
      }
    </div>
  )
}

export default Auth
