import { useState } from 'react'
import './Auth.scss'
import Login from './Login'
import Register from './Register'

const Auth = () => {
  const [opt, setOpt] = useState(false)

  const goRegister = () => {
    setOpt(true)
  }

  const goLogin = () => {
    setOpt(false)
  }

  return (
    <div className="Auth">
      <button onClick={goLogin}>Ya tengo cuenta</button>
      <button onClick={goRegister}>Registrarme</button>
      {
        opt
        ? <Register /> 
        : <Login />
      }
    </div>
  )
}

export default Auth
