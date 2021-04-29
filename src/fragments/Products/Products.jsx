import { useState, useEffect } from 'react'
import { getAllProducts } from '../../services/ProductsService'
import ProductDetail from './ProductDetail'
import Pagination from './Pagination'
import './Products.scss'

const Products = () => {
  const [ products, setProducts ] = useState({})
  const [ loading, setLoading] = useState(false)
  const [ currentPage, setCurrentPage] = useState(1)
  const [ prodPerPage, setprodPerPage ] = useState(2) //num

  const getProducts = async () => {
    setLoading(true)
    const allProducts = await getAllProducts()
    setProducts(allProducts)
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Get current
  const indexOfLastProduct = currentPage * prodPerPage
  const indexOfFirstProduct = indexOfLastProduct - prodPerPage
  const currentProducts = products.listProducts?.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (n) => {
    setCurrentPage(n)
  }

  return (
    <div className="Products container">
     {
       loading ? <p>Loading...</p> : (
       products.listProducts
        ? (
          <>
          {currentProducts?.map((product) => (
            <ProductDetail
            key={product.id}
            product= {product}
            />
          ))}
          <Pagination 
          prodPerPage={prodPerPage}
          totalProd={products.listProducts?.length} 
          paginate={paginate} />
          </>
        ) : (
          <>
          <h1>YES SEND</h1>
            {
              products.yesSend?.map((p) => <p>{p.name}</p>)
            }
            <h1>NO SEND</h1>
            {
              products.noSend?.map((p) => <p>{p.name}</p>)
            }
          </>
        )
       )
      }
    </div>
  )
}

export default Products
