import { useState } from 'react'
import Input from '../../components/Input/Input';
import { suppRegister } from '../../services/AuthService';
import { CATEGS, TYPES } from './validatorsRegister'
import { useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import './RegisterSupp.scss'
import SearchableMap from './Geocode';

const notify = (value) => toast(value);

/* function PreviewImage(uploadImage, uploadPreview) {
  var oFReader = new FileReader()
  oFReader.readAsDataURL(document.getElementById(uploadImage).files[0])
  oFReader.onload = function (oFREvent) {
      document.getElementById(uploadPreview).src = oFREvent.target.result
  }
} */

function PreviewImage(uploadImage, uploadpreview, imgsArr) {
  for (let i = 0; i < imgsArr.length; i++) {
    var oFReader = new FileReader()
    oFReader.readAsDataURL(document.getElementById(uploadImage).files[0])
    oFReader.onload = function (oFREvent) {
        document.getElementById(uploadpreview).src = oFREvent.target.result
    }
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
  const [ lon, setLon ] = useState(0)
  const [ lat, setLat ] = useState(0)

  const lift = (lon, lat) => {
    setLon(lon)
    setLat(lat)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(lon, lat)
    const formData = new FormData()
    Object.entries(state.fields).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append('lon', lon)
    formData.append('lat', lat)
    
    suppRegister(formData)
      .then(() => {
        push("/acceso-tiendas")
        notify('¡Tienda registrada!')
      })
      .catch((error) => {
        console.log(error.response.data.errors)
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
    } else {
      setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [e.target.name]: e.target.value
        }
      }))
    }
  }

  return (
    <div className="container px-5">
      <div className="AuthSuppliers px-5">
        <div className="partRegisterSupp text-center">
          <h2>Registra tu tienda</h2>
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

              <div className="container">
                <div className="row justify-content-center align-items-center">
                  <div className="col-4">
                    <label htmlFor="categ">Categoría</label>
                  </div>
                  <div className="col-8 select-input">
                    <select name="categ" onChange={onChange} value={state.fields.categ} >
                      {CATEGS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  <div className="col-4">
                    <label htmlFor="type">Tipo de comercio</label>
                  </div>
                  <div className="col-8 select-input">
                    <select name="type" onChange={onChange} value={state.fields.type}>
                      {TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="container px-4 mt-1">
                <div className="row">
                  <label htmlFor="bio">Descripción de la tienda</label>
                </div>
                <div className="row text-area-input">
                  <textarea 
                    name="bio"
                    value={state.fields.bio}
                    onChange={onChange}
                  />
                </div>
              </div>
            
            <div className="row px-4 justify-content-around  align-items-center mt-3">
              <p>Logo</p>
              <input 
                type="file"
                className="file-input-hidden"
                name="logo"
                onChange={onChange}
                id="uploadImageLogo"
              />
              <label className="file-input-label" htmlFor="logo">Seleccionar el logo de la tienda</label>
              {state.fields.logo.length !== 0 && PreviewImage("uploadImageLogo", "uploadPreview", state.fields.logo)}
              {state.fields.logo.length !== 0 && (<img alt="img" id="uploadPreview" style={{width: 130}}/>)}
            </div>
            
            <div className="row px-4 justify-content-around  align-items-center mt-3">
              <p>La tienda</p>
              <input 
                type="file"
                name="imgs"
                className="file-input-hidden"
                onChange={onChange}
                id="uploadImageIMGS"
              />
              <label className="file-input-label" htmlFor="imgs">Selecciona una imagen de tu tienda</label>
              {state.fields.logo.length !== 0 && PreviewImage("uploadImageIMGS", "uploadPreviewImgs", state.fields.imgs)}
              {state.fields.logo.length !== 0 && (<img alt="img" id="uploadPreviewImgs" style={{width: 130}}/>)}
            </div>
            </div>
            
            <h4>3. Dirección</h4>
            <div className="row">
              <div className="col">
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

              </div>
            </div>
            <div className="partRegisterSupp">
              <div className="row justify-content-center mb-5">
                <div className="mapContainerRegister">
                  <SearchableMap lift={lift}/>
                </div>
              </div>
            </div>

            <h4>4. Responsable</h4>
            <div className="partRegisterSupp">
              <Input 
                label="Nombre del responsable" name="ownerName" type="text"
                value={state.fields.ownerName}
                onChange={onChange} 
                autoComplete="off"
              />
              

              <div className="container px-4 mt-1">
                <div className="row">
                  <label htmlFor="ownerBio">Breve descripción del responsable</label>
                </div>
                <div className="row text-area-input">
                  <textarea 
                    name="ownerBio"
                    value={state.fields.ownerBio}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="row px-4 justify-content-around  align-items-center mt-3">
                <p>El responsable</p>
                <input 
                  type="file"
                  className="file-input-hidden"
                  name="ownerImg"
                  onChange={onChange}
                  id="uploadImageownerImg"
                />
                <label className="file-input-label" htmlFor="ownerImg">Selecciona una imagen</label>
                {state.fields.logo.length !== 0 && PreviewImage("uploadImageownerImg", "uploadPreviewowner", state.fields.imgs)}
                {state.fields.logo.length !== 0 && (<img alt="img" id="uploadPreviewowner" style={{width: 130}}/>)}  
              </div>

            </div>
            
          
          <div className="row justify-content-center action-button">
            <button type="submit">Registrarse</button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  )
}

export default RegisterSupp
