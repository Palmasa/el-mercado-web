import { useState, useContext } from 'react'
import Input from '../../components/Input/Input'
import { SuppContext } from '../../contexts/SuppContext';
import { suppLogin } from '../../services/AuthService';
import { setAccessToken } from '../../store/AccessTokenStore.js'
import { useHistory } from 'react-router';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validators = {
  email: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir el email'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Es necesario introducir un email válido'
    }
    return message
  },
  password: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir la contraseña'
    } else if (value.length < 6) {
      message = 'La contraseña introducida es demasiado corta'
    }
    return message
  }
}

const LoginSupp = () => {
  const { getSupp } = useContext(SuppContext)
  const { push } = useHistory();

  const [ state, setState ] = useState ({
    fields: {
      email: '',
      password: ''
    },
    errors: {
      email: validators.email(),
      password: validators.password()
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})
  const [touched, setTouched ] = useState({})

  const isValid = () => {
    const { errors } = state
    return !Object.keys(errors).some(e => errors[e])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (isValid()) {
      suppLogin(state.fields)
      .then((response) => {
        setAccessToken(response.access_token)
        getSupp().then(() => {
          push("/area-tiendas")
        })
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
    <div className="AuthSuppliers LoginSuppliers container">
      <form onSubmit={onSubmit}>

        <Input 
          label="Email" name="email" type="email"
          value={state.fields.email}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          error={state.errors.email && touched.email ? state.errors.email : ""}
        />

        <Input 
          label="Contraseña" name="password" type="password"
          value={state.fields.password}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          error={state.errors.password  && touched.password ? state.errors.password : ""}
        />
        <div>
          {resError.error ? resError.info : ""}
        </div>

      <button type="submit">Acceder</button>
      </form>
    </div>
  )
}

export default LoginSupp
