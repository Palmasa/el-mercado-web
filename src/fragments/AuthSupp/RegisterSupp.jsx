import { useState } from 'react'
import Input from '../../components/Input/Input';
import { suppRegister } from '../../services/AuthService';
import { CATEGS, TYPES } from './validatorsRegister'
import { useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import './RegisterSupp.scss'

const notify = (value) => toast(value);

function PreviewImage(uploadImage, uploadPreview) {
  var oFReader = new FileReader()
  oFReader.readAsDataURL(document.getElementById(uploadImage).files[0])
  oFReader.onload = function (oFREvent) {
      document.getElementById(uploadPreview).src = oFREvent.target.result
  }
}

const RegisterSupp = () => {
  const { push } = useHistory();
  const [ state, setState ] = useState ({
    fields: { 
      email: '', password: '',
      name: '', categ: '', type: '', CIF: '',
      bio: '', logo: '', imgs: '',
      city: '', street: '', number: '', zip: '',
      ownerName: '', ownerBio: '', ownerImg: '',
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(state.fields).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    suppRegister(formData)
      .then(res => {
        push("/acceso-tiendas")
        notify('¡Tienda registrada!')
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  const onChange = (e) => {
    if (e.target.type === "file") {
      setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [e.target.name]: e.target.files[0]
        }
      }))
    }

    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [e.target.name]: e.target.value
      }
    }))
  }

  return (
    <div className="AuthSuppliers RegisterSuppliers container">
      <div className="partRegisterSupp text-center">
        <h2>Registra un puesto</h2>
      </div>
      <form onSubmit={onSubmit}>
          <h4>1. Credenciales</h4>
          <div className="partRegisterSupp">
            <Input 
              label="Email" name="email" type="email"
              value={state.fields.email}
              onChange={onChange}
              autoComplete="off"
              className="registerInput"
            />
            <Input 
              label="Contraseña" name="password" type="password"
              value={state.fields.password}
              onChange={onChange}
              autoComplete="off"
            />
          </div>

          <h4>2. Tu tienda</h4>
          <div className="partRegisterSupp">
            <Input 
              label="Nombre de la tienda" name="name" type="text"
              value={state.fields.name}
              onChange={onChange}
              autoComplete="off"
            />
            <Input 
              label="CIF" name="CIF" type="text"
              value={state.fields.CIF}
              onChange={onChange} 
              autoComplete="off"
            />
          <label htmlFor="categ">Categoría</label>
          <select name="categ" onChange={onChange} value={state.fields.categ} >
            {CATEGS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <label htmlFor="type">Tipo de comercio</label>
          <select name="type" onChange={onChange} value={state.fields.type}>
            {TYPES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <label htmlFor="bio">Descripción de la tienda</label>
          <textarea 
            name="bio"
            value={state.fields.bio}
            onChange={onChange}
          />
          <label htmlFor="logo">Logo de la tienda</label>
          <input 
            type="file"
            name="logo"
            onChange={onChange}
            value={state.fields.logo}
            id="uploadImageLogo"
          />
          {state.fields.logo && PreviewImage("uploadImageLogo", "uploadPreviewLogo") }
          {state.fields.logo &&  <img alt="img" id="uploadPreviewLogo" style={{width: 100}}/>}

          <label htmlFor="imgs">Imagen de la tienda</label>
          <input 
            type="file"
            name="imgs"
            onChange={onChange}
            value={state.fields.imgs}
            id="uploadImage"
          />
          {state.fields.imgs && PreviewImage("uploadImage", "uploadPreview") }
          {state.fields.imgs &&  <img alt="img" id="uploadPreview" style={{width: 100}}/>}
          </div>
          
          <h4>3. Dirección</h4>
          <div className="partRegisterSupp">
            <Input 
              label="Ciudad" name="city" type="text"
              value={state.fields.city}
              onChange={onChange}
              autoComplete="off"
            />

            <Input 
              label="Calle / Vía" name="street" type="text"
              value={state.fields.street}
              onChange={onChange} 
              autoComplete="off"
            />

            <Input 
              label="Número de la vía" name="number" type="number"
              value={state.fields.number}
              onChange={onChange} 
              autoComplete="off"
            />

            <Input 
              label="Código postal" name="zip" type="number"
              value={state.fields.zip}
              onChange={onChange} 
            />
          </div>

          <h4>4. Responsable</h4>
          <div className="partRegisterSupp">
            <Input 
              label="Responsable del comercio" name="ownerName" type="text"
              value={state.fields.ownerName}
              onChange={onChange} 
              autoComplete="off"
            />
            <label htmlFor="ownerBio">Breve descripción del responsable</label>
            <textarea 
              name="ownerBio"
              value={state.fields.ownerBio}
              onChange={onChange}
              autoComplete="off"
            />

            <label htmlFor="ownerImg">Imagen del responsable</label>
            <input 
              type="file"
              name="ownerImg"
              onChange={onChange}
              value={state.fields.ownerImg}
              id="uploadImageOwnerImg"
            />
            {state.fields.ownerImg && PreviewImage("uploadImageownerImg", "uploadPreviewownerImg") }
            {state.fields.ownerImg &&  <img alt="img" id="uploadPreviewownerImg" style={{width: 100}}/>}

          </div>

        <button type="submit">Registrarse</button>
      </form>
      <Toaster />
    </div>
  )
}

export default RegisterSupp
