import React, { useState } from "react";
import { createShipping } from '../../services/ShippService';
import Select from 'react-select'
import SuppNavbar from '../SuppNavbar/SuppNavbar';
import SelectCustom from './SelectCustom';
import { optionsTime, optionProvinces } from './Data'

const Provinces = () => {
  const [ state, setState ] = useState ({
    fields: {
      name: '',
      selected: 'byProvince',
      provinces: [],
      price: 0,
      sendTime: '',
      sendDisccount: ''
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(state.fields)
    createShipping(state.fields)
    .then(res => console.log(res)) 
  }

  const handleChange = (e) => {
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [e.target.name]: e.target.value
      }
    }))
  }

  const handleChangeSelect = (value) => {
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        sendTime: value.value
      }
    }))
  }

  const handleChangeProvince = (e) => {
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        provinces: [ ...prevState.fields.provinces, e.target ]
      }
    }))
    console.log(state.fields.provinces)
  }

  return (
    <div>
    <SuppNavbar />
    <h1>Por provincia</h1>
      <form onSubmit={onSubmit}>
      <label htmlFor="name">Nombre del modelo</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={state.fields.name}
          />
          <label htmlFor="price">Precio</label>
          <input
            name="price"
            type="number"
            onChange={handleChange}
            value={state.fields.price}
          />
          <label htmlFor="sendDisccount">Descuento de envío</label>
          <input
            name="sendDisccount"
            type="text"
            onChange={handleChange}
            value={state.fields.sendDisccount}
          />
          <label htmlFor="sendTime">
            Tiempo estimado de entrega
          </label>
          <SelectCustom
            options={optionsTime}
            value={state.fields.sendTime}
            onChange={handleChangeSelect}
            className={'input'}
          />
          <label htmlFor="provinces">Provincias</label>
          <Select
            name="provinces"
            value={state.fields.provinces}
            options={optionProvinces}
            onChange={handleChangeProvince}
            isMulti
          />
          {/* <MultiSelect
            options={optionProvinces}
            value={state.fields.provinces}
            onChange={handleChangeProvince}
            className={'input'}
          /> */}
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Provinces
