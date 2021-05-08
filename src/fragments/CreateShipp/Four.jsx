import React, { useState } from "react";
import SuppNavbar from '../SuppNavbar/SuppNavbar';
import { createShipping } from '../../services/ShippService';
import SelectCustom from './SelectCustom';
import { useHistory } from 'react-router';
import { optionsTime, optionProvinces } from './Data'
import { useParams } from "react-router";
import { toBackPrice, cashConverter } from '../../helpers/priceConverter'
import './Four.scss'

function Four() {
  const { push } = useHistory();
  const { option } = useParams()
  let title, selec
  if (option === '1') {
    title = 'Todo el territorio nacional'
    selec = ''
  } else if (option === '2') {
    title = 'Peninsula'
    selec = 'two'
  }  else if (option === '3') {
    title = 'Peninsula y Baleares (sin Ceuta y Melilla)'
    selec = 'Three'
  }  else if (option === '4') {
    title = 'Peninsula y Baleares (incluyendo Ceuta y Melilla)'
    selec = 'four'
  }  else if (option === '5') {
    title = 'Canarias'
    selec = 'five'
  }
  
  const [ state, setState ] = useState ({
    fields: {
      name: '',
      selected: selec,
      price: '',
      sendTime: '',
      sendDisccount: ''
    }
  })
  const [inputList, setInputList] = useState([{
    province: "",
    time: "",
    price: ""
  }])

  const onSubmit = (e) => {
    e.preventDefault()
    state.fields.price = toBackPrice(state.fields.price)
    state.fields.sendDisccount = toBackPrice(state.fields.sendDisccount)

    const send = { ...state.fields, different: inputList }
    console.log(send)
    createShipping(send)
    .then(() => {
      push("/envios-tiendas")
    })
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
// Different ----------------------------------------------
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  }
  const handleInputSelect= (value, index) => {
    const list = [...inputList];
    list[index].province = value.value;
    setInputList(list);
  }
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }
  const handleAddClick = () => {
    setInputList([ ...inputList, { province: "",time: "", price: "" }]);
  }

  return (
    <>
    <SuppNavbar />
    <div className="container d-flex justify-content-center">
      <div className="AuthSuppliers" style={{width: 600}}>
        <div className="row justify-content-center border-bottom">
          <h1>Crear modelo de envío </h1>
        </div>
        <div className="row justify-content-center mt-1 mb-4">
          <h4>{title}</h4>
        </div>

        <div className="container">
          <form onSubmit={onSubmit}>

            <div className="row">
              <div className='col'>
                <label htmlFor="name">Nombre del modelo*</label>
              </div>
              <div className='col'>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={state.fields.name}
                  className="puttIn"
                />
              </div>
            </div>

            <div className="row">
              <div className='col'>
                <label htmlFor="price">Precio de envío*</label>
              </div>
              <div className='col'>
                <input
                  name="price"
                  type="number"
                  min="0"
                  autoComplete="off"
                  onChange={handleChange}
                  value={state.fields.price}
                  className="puttIn"
                />
                { state.fields.price && <p>¿Es este el pecio correcto? <b>{cashConverter(toBackPrice(state.fields.price))} €</b></p>}
              </div>
            </div>

            <div className="row mb-3">
              <div className='col'>
                <label htmlFor="sendDisccount">¿Hay cantidad mínima por la que el envío sea gratuito?</label>
              </div>
              <div className='col'>
                <input
                  name="sendDisccount"
                  type="text"
                  onChange={handleChange}
                  value={state.fields.sendDisccount}
                  className="puttIn"
                />
                { state.fields.sendDisccount && <p>¿Es esta la cantidad correcta? <b>{cashConverter(toBackPrice(state.fields.sendDisccount))} €</b></p>}
              </div>
            </div>

            <div className="row">
              <div className='col'>
                <label htmlFor="sendTime">Tiempo estimado de entrega*</label>
              </div>
              <div className='col'>
                <SelectCustom
                  options={optionsTime}
                  value={state.fields.sendTime}
                  placeholder='Tiempo aproximado de entrega'
                  onChange={handleChangeSelect}
                />
              </div>
            </div>
            
            <div className="row mt-5">
              <div className='col'>
                <p>¿Existen excepciones?</p>
              </div>
              <div className='col'>
                {inputList.map((x, i) => (
                    <div className="exceptions" key={Math.ceil(Math.random() * 1000)}>
                      <SelectCustom
                        options={optionProvinces}
                        value={x.province}
                        index={i}
                        placeholder='Provincia...'
                        onChange={handleInputSelect}
                      />
                      <input
                        name="price"
                        placeholder="¿Precio diferente?"
                        type="number"
                        min="0"
                        value={x.price}
                        onChange={e => handleInputChange(e, i)}
                        className="puttIn my-2"
                      />
                      <div>
                        {inputList.length !== 1 && <button
                          className="buttonShipping-S mx-2 mb-2"
                          onClick={() => handleRemoveClick(i)}> - Eliminar</button>}
                        {inputList.length - 1 === i && <button className="buttonShipping-S mx-2 mb-2" onClick={handleAddClick}> + Añadir</button>}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <button type="submit" className="buttonShipping">Crear modelo de envío</button>
            </div>
          </form>
        </div>
      </div>

    </div>
    </>
  );
}

export default Four;