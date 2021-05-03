import { useEffect, useState } from "react";
import { createProduct } from "../../services/ProductsService";
import { getAllShippings } from "../../services/SuppService.js";
import Input from "../../components/Input/Input";
import "./CreateProduct.scss";
import { useHistory } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { productCategs } from './data'
const notify = (value) => toast(value);

const MEASURES = ["Kg", "Unidad", "Pack"];

const CreateProduct = () => {
  const { push } = useHistory();
  const [shippings, setShippings] = useState([]);
  const [state, setState] = useState({
    fields: {
      shippingName: "",
      name: "",
      bio: "",
      categ: "",
      price: 0,
      measure: "",
      ifPack: 0,
      img: '',
      stock: 0,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.entries(state.fields).forEach(([key, value]) => {
      key !== "img" && formData.append(key, value);
    });
    for (let i = 0; i < state.fields.img.length; i++) {
      formData.append("img", state.fields.img[i]);
    }

    createProduct(formData)
      .then((product) => {
        console.log(product);
        push("/productos-tiendas");
        notify("¡Producto creado!");
      })
      .catch((e) => console.log(e.response.data));
  };

  const onChange = (e) => {
    if (e.target.type === "file") {
      setState((prevState) => ({
        fields: {
          ...prevState.fields,
          [e.target.name]: e.currentTarget?.files
        }
      }))
    }
    console.log(e.currentTarget?.files)
    console.log(state.fields.img)

    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [e.target.name]: e.target.value,
      },
    }))
  }

  const getShippName = () => {
    const nameShippings = []
    getAllShippings()
    .then((res) => {
      res.map((ship) => nameShippings.push(ship.name))
      setShippings(nameShippings)
    })
  }

  useEffect(() => {
    getShippName()
  }, []);

  return (
    <div className="container p-4">
    <div className="text-center mb-5 mt-2">
      <h2>Crear producto</h2>
    </div>
      <div className="container" style={{width: 600}}>
      <form onSubmit={onSubmit}>

        <div className="row mt-3">
          <Input 
            label="Nombre del producto*" name="name" type="text"
            value={state.fields.name}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <div className="row mt-3">
          <Input 
            label="Precio del producto*" name="price" type="number"
            value={state.fields.price}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <div className="row mt-3">
          <div className="col">
            <label htmlFor="bio">Descripción de producto*</label>
          </div>
          <div className="col">
            <textarea 
              label="Descripción" name="bio"
              value={state.fields.bio}
              onChange={onChange}
              autoComplete="off"
              className="putIn"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label htmlFor="shippingName">Modelo de envío*</label>
          </div>
          <div className="col">
            <select name="shippingName" onChange={onChange} value={state.fields.shippingName} className="putIn">
              {shippings.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>


        <div className="row mt-3">
          <div className="col">
            <label htmlFor="measure">Medida*</label>
          </div>
          <div className="col">
            <select name="measure" onChange={onChange} value={state.fields.measure} className="putIn">
              {MEASURES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <Input 
            label="¿Está paquetizado?" name="ifPack" type="number"
            value={state.fields.ifPack}
            onChange={onChange}
            autoComplete="off"
          />
        </div>


        <div className="row mt-3">
          <div className="col">
            <label htmlFor="categ">Categoría*</label>
          </div>
          <div className="col">
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
        
        <div className="row mt-3" >
          <label htmlFor="img">Imágenes de producto*</label>
          <input
            type="file"
            name="img"
            id={state.fields.img}
            value={state.fields.img}
            onChange={onChange}
            multiple
          />
        </div>
        
        <div className="row justify-content-center mt-4">
          <button type="submit" className="ButtonCreateP">Crear producto</button>
        </div>
      </form>

      </div>
      <Toaster />
    </div>
  );
};

export default CreateProduct;
