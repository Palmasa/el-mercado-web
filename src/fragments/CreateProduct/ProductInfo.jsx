import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductPerSupp, reactivateProducts, desactivateProducts, deleteProduct } from '../../services/ProductsService.js'
import { cashConverter } from '../../helpers/priceConverter'
import ClipLoader from "react-spinners/ClipLoader";
import './ProductInfo.scss'

const ProductInfo = () => {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(true)

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

  useEffect(() => {
    getProducts()
  }, [])

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
              <div className="col-2">
                <h4>Stock</h4>
              </div>
              <div className="col"></div>
            </div>
          {
            products.map((product) => (
            <div className="row mb-3 align-items-center" key={product.id}>
              <div className="col-2 text-center mr-1">
                <img src={product.img[0]} alt="p" style={{height: 70}}/>
              </div>
              <div className="col-3">
              <p>{product.name}</p>
              </div>
              <div className="col">
              <p>{cashConverter(product.price)}€</p>
              </div>
              <div className="col-2">
              <p>{product.stock}</p>
              </div>
              <div className="col-3 products-butttons-suppliers">
              {
                product.active
                ? <button style={{ backgroundColor: '#fafafa'}} onClick={() => desactivate(product.id)}>Desactivar</button>
                : <button className="activate" onClick={() => activate(product.id)}>Activate</button>
              }
              <button className="ml-1" style={{ backgroundColor: '#fafafa'}} onClick={() => deleteP(product.id)}>Eliminar</button>
              </div>
            </div>
          ))
          }
          </div>
        )
      }
    </div>
  )
}

export default ProductInfo
