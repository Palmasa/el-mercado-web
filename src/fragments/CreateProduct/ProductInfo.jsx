import { useContext, useEffect, useState } from 'react'
import { SuppContext } from '../../contexts/SuppContext'
import { getProductPerSupp } from '../../services/ProductsService.js'

const ProductInfo = () => {
  const { supp } = useContext(SuppContext)
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
    <div className="row">
      <h2>{supp?.name}</h2>
      <h2> - Productos</h2>
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
    </div>
  )
}

export default ProductInfo
