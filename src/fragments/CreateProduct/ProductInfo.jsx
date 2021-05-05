import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductPerSupp } from '../../services/ProductsService.js'
import toast, { Toaster } from "react-hot-toast";

const notify = (value) => toast(value);

const ProductInfo = () => {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    getProductPerSupp()
    .then(res => {
      setProducts(res)
      setLoading(false)
    })
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
            <div className="row" key={product.id}>
              <p>{product.name}</p>
              {product.sales.map((sale) => <p>{sale.state}</p>)}
            </div>
          ))
          }
          </div>
        )
      }
      <Toaster />
    </div>
  )
}

export default ProductInfo
