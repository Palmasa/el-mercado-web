import { useState } from 'react'
import Login from './Login'
import Register from './Register'
import './Auth.scss'

const Auth = ({shoppingBag}) => {
  const [opt, setOpt] = useState(true)

  const goRegister = () => {
    setOpt(false)
  }

  const goLogin = () => {
    setOpt(true)
  }

  return (
    <div className="Auth container mb-5">
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
        ? <Login shoppingBag={shoppingBag}/>
        : <Register /> 
      }
    </div>
  )
}

export default Auth
