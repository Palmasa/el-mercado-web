import { useEffect, useState } from "react";
import { createProduct } from "../../services/ProductsService";
import { getAllShippings } from "../../services/SuppService.js";
import { toBackPrice, cashConverter } from '../../helpers/priceConverter'
import Input from "../../components/Input/Input";
import { useHistory } from "react-router";
import { productCategs } from './data'
import ClipLoader from "react-spinners/ClipLoader";
import "./CreateProduct.scss";

function PreviewImage(uploadImage, imgsArr) {
  for (let i = 0; i < imgsArr.length; i++) {
    var oFReader = new FileReader()
    oFReader.readAsDataURL(document.getElementById(uploadImage).files[i])
    oFReader.onload = function (oFREvent) {
        document.getElementById(`uploadPreview${i}`).src = oFREvent.target.result
    }
  }
}

const MEASURES = ["Kg", "Unidad", "Pack", "L", "ml"];

const CreateProduct = () => {
  const { push } = useHistory();
  const [ shippings, setShippings ] = useState([])
  const [loader, setLoader] = useState(true);
  const [state, setState] = useState({
    fields: {
      shippingName: '',
      name: "",
      bio: "",
      categ: "",
      price: '',
      measure: "",
      img: [],
      ifPack: 0,
      stock: 0,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault()
    setLoader(true)
    state.fields.price = toBackPrice(state.fields.price)
    console.log(state.fields)
    let formData = new FormData();
    Object.entries(state.fields).forEach(([key, value]) => {
      key !== 'img' && formData.append(key, value);
    })
    for (let i = 0; i < state.fields.img.length; i++) {
      formData.append("img", state.fields.img[i])
    }

    createProduct(formData)
      .then((product) => {
        console.log(product);
        push("/productos-tiendas")
      })
      .catch((e) => {
        console.log(e.response.data)
        setLoader(false)
      });
  };

  const onChange = (e) => {
    if (e.target.type === "file") {
      setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [e.target.name]: e.target.files,
        },
      }))

    } else {
      setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [e.target.name]: e.target.value,
        },
      }))
    }
  }

  const getShippName = () => {
    const nameShippings = []
    getAllShippings()
    .then((res) => {
      res.map((ship) => nameShippings.push(ship.name))
      setShippings(nameShippings)
      setLoader(false)
    })
  }
  

  useEffect(() => {
    getShippName()
  }, [])

  return (
    <>
      { 
      loader 
      ? (
        <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
        </div>
      )
      : (
      <div className="container d-flex justify-content-center">
        <div className="CreateProduct" style={{width: 600}}>
        <div className="text-center mb-4 mt-2 border-bottom">
          <h2>Crear producto</h2>
        </div>
          <div className="container"> 
  
          <form onSubmit={onSubmit} className="form-createProduct">
            <div className="row mt-2">
              <Input 
                label="Nombre del producto*" name="name" type="text"
                value={state.fields.name}
                onChange={onChange}
                autoComplete="off"
              />
            </div>
  
            <div className="container mt-1">
              <div className="row">
                <label htmlFor="bio">Descripci??n de producto*</label>
              </div>
              <div className="row text-area-input">
                <textarea 
                  label="Descripci??n" name="bio"
                  value={state.fields.bio}
                  onChange={onChange}
                  autoComplete="off"
                  className="putIn"
                />
              </div>
            </div>

            <div className="row mt-2 justify-content-between align-items-center">
                <div className="col-4 ml-0">
                  <label htmlFor="shippingName">Modelo de env??o*</label>
                </div>
            <div className="col-8 select-input">
                <select name="shippingName" onChange={onChange} value={shippings[0]} className="putIn">
                  {shippings.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mt-2 justify-content-between align-items-center">
                <div className="col-4 ml-0">
                  <label htmlFor="measure">Medida*</label>
                </div>
            <div className="col-8 select-input">
                <select name="measure" onChange={onChange} value={state.fields.measure} className="putIn">
                  {MEASURES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <Input 
                label={`Precio / ${state.fields.measure} *`} name="price"
                min='0'
                value={state.fields.price}
                onChange={onChange}
                autoComplete="off"
              />
            {
              state.fields.price && (
                <>
                <div className="col-4 mb-0">
                  <small>??Es este el precio correcto? </small>
                </div>
                <div className="col justify-content-start mb-0">
                <small>{cashConverter(toBackPrice(state.fields.price))} ???</small>
                </div> 
                </> 
                )
                
            }
            </div>
            <div className="row mt-3">
              <Input 
                label="??Est?? paquetizado? Indique cantidad/pack" name="ifPack" type="number"
                min='0'
                value={state.fields.ifPack}
                onChange={onChange}
                autoComplete="off"
              />
            </div>

            <div className="row mt-2 justify-content-between align-items-center">
                <div className="col-4 ml-0">
                  <label htmlFor="categ">Categor??a*</label>
                </div>
            <div className="col-8 select-input">
                <select name="categ" onChange={onChange} value={state.fields.categ} className="putIn">
                  {productCategs.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="row mt-3">
              <Input 
                label="Stock disponible*" name="stock" type="number"
                value={state.fields.stock}
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            
            <div className="row px-4 justify-content-around  align-items-center mt-3">
              <p>Im??genes del producto</p>
              <input
                type="file"
                className="file-input-hidden"
                name="img"
                onChange={onChange}
                id="uploadImageLogo"
                multiple
              />
              <label className="file-input-label" htmlFor="img">Seleccionar</label>
            </div>
            <div className="row px-4 justify-content-around  align-items-center mt-3">
              {state.fields.img.length !== 0 && PreviewImage("uploadImageLogo", state.fields.img) }
              {state.fields.img.length >= 1 && (<img alt="img" id="uploadPreview0" style={{width: 130}}/>)}
              {state.fields.img.length >= 2 && (<img alt="img" id="uploadPreview1" style={{width: 130}}/>)}
              {state.fields.img.length >= 3 && (<img alt="img" id="uploadPreview2" style={{width: 130}}/>)}
              {state.fields.img.length >= 4 && (<img alt="img" id="uploadPreview3" style={{width: 130}}/>)}
              {state.fields.img.length >= 5 && (<img alt="img" id="uploadPreview3" style={{width: 130}}/>)}
            </div>
            
            <div className="row justify-content-center mt-4">
              <button type="submit" className="ButtonCreateP">Crear producto</button>
            </div>
          </form>
  
          </div>
        </div>
      </div>
  
    )
  
    }

    </>
  );
};

export default CreateProduct;
