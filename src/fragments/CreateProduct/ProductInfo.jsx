import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductPerSupp, reactivateProducts, desactivateProducts } from '../../services/ProductsService.js'
import { cashConverter } from '../../helpers/priceConverter'

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
      <h2>Productos</h2>
    </div>
    <div className="col">
      <Link className="acco-but" to="/productos-tiendas/crear-producto">Publicar nuevo producto</Link>
    </div>
    </div>
      {
        loading
        ? <p>Loading</p>
        : (
          <div>
          {
            products.map((product) => (
            <div className="row justify-content-between" key={product.id}>
              <p>{product.name}</p>
              <p>{cashConverter(product.price)}€</p>
              <p>Q - {product.stock}</p>
              {
                product.active
                ? <button onClick={() => desactivate(product.id)}>Desactivar</button>
                : <button onClick={() => activate(product.id)}>Activate</button>
              }
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
