import { useState, useEffect } from 'react'
import { getAllProducts } from '../../services/ProductsService'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import './Products.scss'

const Products = () => {
  const [ products, setProducts ] = useState({})
  const [ loading, setLoading] = useState(false)
  const [ currentPage, setCurrentPage] = useState(1)
  const [ prodPerPage ] = useState(2) //num

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
  let currentProducts = products.listProducts?.slice(indexOfFirstProduct, indexOfLastProduct)
  let productsLenght = products.listProducts?.length

  if (!products.listProducts) {
    if (products.yesSend && products.noSend) {
      let allP = products.noSend?.map((p) => ({ ...p, noSend: true }))
      allP = [ ...products.yesSend, ...allP ]
      productsLenght = allP.length
      currentProducts = allP?.slice(indexOfFirstProduct, indexOfLastProduct)
    }
  }

  
  const paginate = (n) => {
    setCurrentPage(n)
  }

  return (
    <div className="Products container">
     {
       loading
       ? <p>Loading...</p> 
       : (
         <>
         {
          currentProducts?.map((product) => (
            <ProductCard
            key={product.id}
            product= {product}
            />
          ))
         }
          <Pagination 
            prodPerPage={prodPerPage}
            totalProd={productsLenght} 
            paginate={paginate}
          />
          </>
       )
      }
    </div>
  )
}

export default Products
