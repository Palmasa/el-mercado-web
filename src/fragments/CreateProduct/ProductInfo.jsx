import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductPerSupp, reactivateProducts, desactivateProducts, deleteProduct } from '../../services/ProductsService.js'
import { cashConverter } from '../../helpers/priceConverter'
import ClipLoader from "react-spinners/ClipLoader";
import { BsGraphUp } from "react-icons/bs"
import { RiDeleteBinLine } from "react-icons/ri"
import './ProductInfo.scss'
import BoostPopUp from './BoostPopUp.jsx';
import { dateConverter } from '../../helpers/dateHelper.js';

const ProductInfo = () => {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ boostPopUp, setBoostPopUp ] = useState(false)
  const [ selectedProduct, setSelectedProduct ] = useState()

  const getProducts = (id) => {
    getProductPerSupp(id)
    .then(res => {
      setProducts(res)
      setLoading(false)
    })
  }

  const deleteP = (id) => {
    deleteProduct(id)
    .then(res => {
      setProducts(res)
      getProducts()
      setLoading(false)
    })
  }

  const desactivate = (id) => {
    desactivateProducts(id)
    .then(() => {
      getProducts()
    })
  }

  const activate = (id) => {
    reactivateProducts(id)
    .then(() => {
      getProducts()
    })
  }

  const goToBoost = (product) => {
    setSelectedProduct(product)
    setBoostPopUp(true)
  }

  const paintBoostTag = (p, price) => {
    if (p.boostPayment === 1500) {
      return <p className="text-center ml-1" style={{marginBottom: 0, lineHeight: 1}}><small>Premium desde el {`${price}`}</small></p>
    } else if (p.boostPayment === 900) {
      return <p className="text-center ml-1" style={{marginBottom: 0, lineHeight: 1}}><small>Inter desde el {`${price}`}</small></p>
    } else {
      return <p className="text-center ml-1" style={{marginBottom: 0, lineHeight: 1}}><small>Básica desde el {`${price}`}</small></p>
    }
  }

  useEffect(() => {
    getProducts()
  }, [boostPopUp])

  return (
    <div className="container p-4">
    <div className="row align-items-center mb-4">
    <div className="col-9">
      <h2 style={{color: '#E15D45'}}>Productos</h2>
    </div>
    <div className="col">
      <Link className="acco-but" to="/productos-tiendas/crear-producto">Publicar nuevo producto</Link>
    </div>
    </div>
      {
        loading
        ? (
          <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
          </div>
        )
        : (
          <div className="container">
            <div className="row mb-3 border-bottom">
              <div className="col-2"></div>
              <div className="col-3">
                <h4>Nombre</h4>
              </div>
              <div className="col">
                <h4>Precio</h4>
              </div>
              <div className="col">
                <h4>Stock</h4>
              </div>
              <div className="col">
                <h4>Acciones</h4>
              </div>
            </div>
          {
            products.map((product) => (
            <div className={`row align-items-center border-bottom  ${ product.isBoosted && "boosted-product"}`} key={product.id}>
              <div className="col-2 text-center mr-1">
                <img className="my-4" src={product.img[0]} alt="p" style={{height: 80}}/>
              </div>
              <div className="col-3">
              <p>{product.name}</p>
              </div>
              <div className="col">
              <p>{cashConverter(product.price)}€</p>
              </div>
              <div className="col text-center">
              <p>{product.stock}</p>
              </div>
              <div className="col-3 products-butttons-suppliers d-flex justify-content-center align-items-center">
              {
                product.active
                ? <button style={{ backgroundColor: '#fafafa'}} onClick={() => desactivate(product.id)}>Desactivar</button>
                : <button className="activate" onClick={() => activate(product.id)}>Reactivar</button>
              }
              <button className="ml-1" style={{ backgroundColor: '#fafafa'}} onClick={() => deleteP(product.id) }><RiDeleteBinLine/></button>
              {
                !product.isBoosted ? (<button 
                className="ml-1"
                style={{ backgroundColor: '#f1ebe4'}}
                onClick={() => goToBoost(product)}
                >
                  <BsGraphUp/>
                </button>) : (
                  product && paintBoostTag(product, dateConverter(product?.boostStart))
                )
              }
              </div>
            </div>
          ))
          }
          </div>
        )
      }
      {
        boostPopUp && <BoostPopUp product={selectedProduct} setClose={setBoostPopUp}/>
      }
    </div>
  )
}

export default ProductInfo
