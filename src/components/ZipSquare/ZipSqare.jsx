import { useState, useContext } from 'react'
import { ZipContext } from '../../contexts/ZipContext';
import { sendZipBack } from '../../services/ZipService';
import { setZip } from '../../store/zipStore';
import './ZipSqare.scss'
const NUMBERS_MATCH = /^[0-9]*$/

const validators = {
  zip: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir un código postal'
    } else if (!NUMBERS_MATCH.test(value)) {
      message = 'El código postal conriene cinco números'
    }
    return message
  }
}
// Component ZipSquare ------------------------------------------------------
const ZipSqare = ({ closeSquare }) => {
  const { getCurrentZip } = useContext(ZipContext)
  const [ state, setState ] = useState ({
    fields: {
      zip: '',
    },
    errors: {
      zip: validators.zip,
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})

  const isValid = () => {
    const { errors } = state
    return !Object.keys(errors).some(e => errors[e])
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (isValid()) {
      sendZipBack(state.fields)
      .then((response) => {
        setZip(response.zDec)
        getCurrentZip()
      })
      .catch((error) => {
        setResError({ error: true, info: error.response.data.message })
      })
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setResError({ error: false })
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

  return (
    <div className="ZipSquare">
      <button onClick={() => closeSquare(false)}> x </button>
      <form onSubmit={onSubmit} >
        <input
          name="zip"
          value={state.fields.zip}
          onChange={onChange} 
        />
        <div>
          {state.errors.zip}
          {resError.error ? resError.info : ""}
        </div>
        <button type="submit">send zip</button>
      </form>
    </div>
  )
}

export default ZipSqare
