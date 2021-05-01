import { useState } from 'react'
import LoginSupp from './LoginSupp'
import RegisterSupp from './RegisterSupp'
import './AuthSupp.scss'


const AuthSupp = () => {
  const [opt, setOpt] = useState(true)

  const goRegister = () => {
    setOpt(false)
  }

  const goLogin = () => {
    setOpt(true)
  }

  return (
    <div className="Auth container">
    <h1>PUESTOS</h1>
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
        Registrar un puesto
        </button>
      </div>
      {
        opt
        ? <LoginSupp />
        : <RegisterSupp /> 
      }
    </div>
  )
}

export default AuthSupp
