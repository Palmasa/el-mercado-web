import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct } from '../../services/ProductsService'
import { cashConverter } from '../../helpers/priceConverter'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { createAddCart } from '../../services/CartService'
import { ZipContext } from '../../contexts/ZipContext';
import { setCart } from '../../store/cartStore'
import toast, { Toaster } from 'react-hot-toast';
import ToRecomend from '../../components/ToRecommend/ToRecomend'
import Magnify from "./Magnify";
import ClipLoader from "react-spinners/ClipLoader";
import ZipSquare from "../../components/ZipSquare/ZipSquare";
import './EachProduct.scss'

const negNotify =  (value) => toast( value );

const EachProduct = () => {
  const { slug } = useParams()
  const { setStateCart } = useContext(CartContext)
  const { stateZip } = useContext(ZipContext)
  const [ product, setProduct ] = useState();
  const [supplier, setSupplier] = useState();
  const [ okTosend, setOkSend ] = useState();
  const [ shippModel, setShippModel ] = useState();
  
  const addItem = () => {
    createAddCart(product.id) // petición al back
    .then((cart) => {
      if (cart.newCart) { // || localStorage.getItem('cart') !== null
        setCart(cart.cart.id)
      }
      setStateCart(cart.cart) // el carrito entero y tengo acceso a el desde cualquier parte
    })
    .catch((error) => {
      console.log(`productCart. error -> ${error.response?.data.errors.zip}`)
      negNotify('Se necesita introducir un código postal')
    })
  }

  useEffect(() => {
    getOneProduct(slug).then((prod) => {
      setProduct(prod.product)
      setOkSend(prod.okToSend)
      setSupplier(prod.supplier)
      if (prod.shippModel) {
        setShippModel(prod.shippModel)
      }
    });
  }, [slug, stateZip]);

  if (!product) {
    return (
    <div style={{height: 600}}>
    <div className="spinner-style"><ClipLoader color="#E15D45" />
    </div>
    </div>)
  }
  return (
    <div className="container mt-2 EachProduct">
      <div className="row mb-5">
        <div className="col-md">
            <Magnify imgs={product.img}/>
        </div>
        <div className="col-md ml-4 mt-3">
          <div className="card-body box-info-product">
            <h2 className="card-title">{product.name}</h2>
            <div className="container">
              <div className="row">
                <h6 className="mr-1">Vendido por:</h6>
                <Link to={`/tiendas/${supplier?.slug}`} className="link-to-supp">
                  <h6>{ supplier?.name}</h6>
                </Link>
              </div>
            </div>

            <p className="card-text">
              {product.bio}
            </p>
          </div>
          {
            okTosend
            ? (
              <div className="box-send-info p-4 m-3">
                <h4>{cashConverter(product.price)} €</h4>
                {cashConverter(shippModel?.sendPrice)} €
                {shippModel?.sendTime}
                <button className="add-button-card-cart" onClick={addItem}>Añadir al carrito</button>
              </div>
            ) : (
              <div className="box-send-info p-2 m-3">
                {
                  stateZip
                  ? <p>Este producto no se envía a su provincia</p>
                  : (
                    <>
                    <h4>{cashConverter(product.price)} €</h4>
                      <ZipSquare />
                    <button className="add-button-card-cart" disabled={true}>Añadir al carrito</button>
                    </>
                  )
                }
              </div>
            )
          }
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          
          {supplier?.name}
          {supplier?.name}
        </div>

        <div className="col">
          {supplier?.ownerName}
        </div>
      </div>

      <div className="row justify-content-center">
        <h6>TO RECOMMEND</h6>
        <ToRecomend />
      </div>

      <Toaster />
    </div>
  );
}

export default EachProduct
