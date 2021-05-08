import { useContext, useState} from 'react'
import { UserContext } from '../../contexts/UserContext'
import Input from '../../components/Input/InputReg'
import './MyProfile.scss'
const validators = {
  street: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir la vía'
    }
    return message
  },
  number: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir el número de la vía'
    }
    return message
  }
}

const MyProfile = () => {

  const { user, editUser, getUser } = useContext(UserContext)
  const [ state, setState ] = useState ({
    fields: {
      city: user?.address.city || '',
      street: user?.address.street || '',
      number: user?.address.number || '',
      block: user?.address.block || '',
      zip: user?.address.zip || '' // EN COMPRA NO SE PERMITAS CAMBIAR 
    },
    errors: {
      street: validators.street,
      number: validators.number
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
      console.log('hola')
      editUser(state.fields)
      .then(() => {
        getUser()
      })
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
    <div className="px-5">
        <form onSubmit={onSubmit} className="myProfile-address-form px-5">

        <Input 
          label="Ciudad" name="city" type="text"
          value={state.fields.city}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
        />

        <Input 
          label="Calle / Vía" name="street" type="text"
          value={state.fields.street}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          error={state.errors.street  && touched.street ? state.errors.street : ""}
        />

        <Input 
          label="Número" name="number" type="text"
          value={state.fields.number}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          error={state.errors.number  && touched.number ? state.errors.number : ""}
        />

        <Input 
          label="Portal / Piso" name="block" type="text"
          value={state.fields.block}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
        />
        <Input 
          label="Código postal" name="zip" type="text"
          value={state.fields.zip}
          onChange={onChange} onBlur={onBlur} onFocus={onFocus}
        />
        <div>
          {resError.error ? resError.info : ""}
        </div>

      <button type="submit">Enviar</button>
    </form>
    </div>
  )
}

export default MyProfile
