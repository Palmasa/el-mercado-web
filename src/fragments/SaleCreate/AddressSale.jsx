import { useContext, useState } from 'react'
import { ZipContext } from '../../contexts/ZipContext'
import { UserContext } from '../../contexts/UserContext'
import { createRealSale } from '../../services/SaleService'
import { cashConverter } from '../../helpers/priceConverter'
import './AddressSale.scss'

const AddressSale = ({ nextStep, setToPay }) => {
  const { stateZip } = useContext(ZipContext)
  const { user } = useContext(UserContext)

  const [ state, setState ] = useState ({
    fields: {
      city: user?.address.city || '',
      street: user?.address.street || '',
      number: user?.address.number || '',
      block: user?.address.block || '',
      zip: user?.address.zip || '28000',
      promo: ''
    }
  })
  const [ resError, setResError ] = useState({ error: false, info: ''})

  const lift = (total) => {
    nextStep(false)
    setToPay(total)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    createRealSale({ 
      city: state.fields.city,
      street: state.fields.street,
      number: state.fields.number,
      block: state.fields.block,
      zip: 28000,
      promo: state.fields.promo
    })

    .then((res) => {
      let total = cashConverter(res.toPay)
      console.log(total)
      console.log(res)
      lift(total)
    })
    .catch((e) => {
      setResError({ error: true, info: e.response.data.errors })
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setResError({ error: false })
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      }
    }))
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="address-sale-form">
        <div className="mt-3">
            <div className="">
              <label htmlFor="zip">
                Provincia
              </label>
            </div>
            <div className="">
              <input
                name="zip"
                value={stateZip}
                disabled = {true}
              />
            </div>
            <p style={{lineHeight: '12px', marginBottom: 8}}>
              <small>
              *Si desea cambiar la provincia de la dirección de entrega se 
              necesita realizar una revisión de la bolsa introduciendo el código postal
              correspondiente
              </small>
            </p>
          </div>

        <div className="">
          <div className="">
            <label htmlFor="city">
              Ciudad
            </label>
          </div>
          <div className="">
            <input
              name="city"
              value={state.fields.city}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <label htmlFor="street">
              Calle / Vía
            </label>
          </div>
          <div className="">
            <input
              name="street"
              value={state.fields.street}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <label htmlFor="number">
              Número
            </label>
          </div>
          <div className="">
            <input
              name="number"
              value={state.fields.number}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <label htmlFor="block">
              Bloque / Piso
            </label>
          </div>
          <div className="">
            <input
              name="block"
              value={state.fields.block}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <label htmlFor="promo">
              ¿Dispone de un códigio de promoción?
            </label>
          </div>
          <div className="">
            <input
              name="promo"
              value={state.fields.promo}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          {resError.error ? resError.info : ""}
        </div>

        <button>Realizar pago</button>

</form>
    </div>
  )
}

export default AddressSale
