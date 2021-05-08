import { useState } from 'react'
import InputReg from '../../components/Input/InputReg';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { register } from '../../services/AuthService';


const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validators = {
  name: (value) => {
    let message
    if (!value) {
      message = '¿Seguro que no quiere introducir su nombre?'
    }
    return message
  },
  email: (value) => {
    let message
    if (!value) {
      message = '*Es necesario introducir el email'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = '*Es necesario introducir un email válido'
    }
    return message
  },
  password: (value) => {
    let message
    if (!value) {
      message = '*Es necesario introducir la contraseña'
    } else if (value.length < 6) {
      message = '*La contraseña introducida debete tener mínimo 6 caracteres'
    }
    return message
  }
}

/* Component Register ------------------------------------------------------- */

const Register = () => {
  const [ state, setState ] = useState ({
    fields: {
      email: '',
      password: '',
      name: ''
    },
    errors: {
      name: validators.name,
      email: validators.email,
      password: validators.password,
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})
  const [touched, setTouched ] = useState({})
  const [ done, setDone ] = useState(false)

  const isValid = () => {
    const { errors } = state
    return !Object.keys(errors).some(e => errors[e])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (isValid()) {
      register(state.fields)
      .then((response => {
        setDone(true)
      }))
      .catch((error) => {
        setResError({ error: true, info: error.response.data.errors.email })
      })
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target

    setResError({ error: false})

    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: validators[name] && validators[name](value)
      }
    }))
  }

  const onFocus = (e) => {
    const { name } = e.target

    setTouched((prevTouch) => ({
      ...prevTouch,
      [name]: false
    }))
  }

  const onBlur = (e) => {
    const { name } = e.target

    setTouched((prevTouch) => ({
      ...prevTouch,
      [name]: true
    }))
  }

  return (
    <div>
      {
        done
        ? (
          <p>
            <AiOutlineInfoCircle /> Revise su correo electrónico para confirmar su identidad, su bolsa le estará esperando cuando vuelva.
          </p>
        ) : (
        <form onSubmit={onSubmit} className="login-register-form">

          <InputReg
            label="Nombre" name="name" type="text"
            value={state.fields.name}
            onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            error={false}
          />
          
          <InputReg
            label="Email" name="email" type="email"
            value={state.fields.email}
            onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            error={state.errors.email && touched.email ? state.errors.email : ""}
          />

          <InputReg
            label="Contraseña" name="password" type="password"
            value={state.fields.password}
            onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            error={state.errors.password && touched.password ? state.errors.password : ""}
          />

        <div>
          {resError.error ? resError.info : ""}
        </div>

        <button type="submit">Registrarse</button>
        </form>
        )
      }

    </div>
  )
}

export default Register
