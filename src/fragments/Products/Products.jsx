import { useState, useEffect, useContext } from 'react'
import { ZipContext } from '../../contexts/ZipContext';
import { getAllProducts, getProductsBySearch } from '../../services/ProductsService'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import './Products.scss'
import { useLocation } from 'react-router';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Products = () => {
  const { stateZip } = useContext(ZipContext)
  const [ products, setProducts ] = useState({})
  const [ loading, setLoading] = useState(false)
  const [ currentPage, setCurrentPage] = useState(1)
  const [ prodPerPage ] = useState(9) //num

  let query = useQuery()
  let filter = query.get('filter')

  const getProducts = async () => {
    setLoading(true)
    if (filter) {
      console.log(filter)
      getProductsBySearch(filter)
      .then((res) => {
        setProducts(res)
        setLoading(false)
      })
    } else {
      const allProducts = await getAllProducts()
      setProducts(allProducts)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [stateZip, filter])

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
    <>
     {
       loading
       ? <p>Loading...</p> 
       : (
        <div className="container text-center p-4">
          <div className="row">
          {
            currentProducts?.map((product) => (
              <div key={product.id} className="col-lg-4 mb-4 d-flex align-items-stretch">
                <ProductCard
                product= {product}
                />
              </div>
            ))
          }
         </div>
          <Pagination 
            prodPerPage={prodPerPage}
            totalProd={productsLenght} 
            paginate={paginate}
          />
          </div>
       )
      }
    </>
  )
}

export default Products
