import { useState, useEffect, useContext } from 'react'
import { ZipContext } from '../../contexts/ZipContext';
import { getAllProducts, getProductsBySearch, getProductsbyCateg } from '../../services/ProductsService'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import { allCategs } from '../../helpers/allCategs.js'
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
  const [ mainCateg, setMain ] = useState([])
  const [ notFound, setNotFound ] = useState(false)
  const [ allProductsPage, setallProductsPage ] = useState(false)

  let query = useQuery()
  let filter = query.get('filter')
  let categ = query.get('categoria')
  let sub = query.get('subcategoria')
  let n = query.get('n')
  let main = Object.keys(allCategs)
  const subs = Object.values(allCategs)

  const scenarios = (res) => {
    if (!res.listProducts) {
      if (res.yesSend?.length === 0 && res.noSend?.length === 0) {
        setNotFound(true)
        setLoading(false)
      } else {
        setProducts(res)
        setNotFound(false)
        setLoading(false)
      }
    } else if (res.listProducts.length === 0) {
      setNotFound(true)
      setLoading(false)
    } else {
      setProducts(res)
      setNotFound(false)
      setLoading(false)
    }
  }

  const getProducts = async () => {
    setLoading(true)
    if (filter) { // ------------------------------ From searchbar
      getProductsBySearch(filter)
      .then((res) => {
        scenarios(res)
        setallProductsPage(false)
      })

    } else if (categ) { // ------------------------------------ from MenuHover && main categs
      const selec = main[categ]
      setMain(selec)
      const select = subs[categ]
      getProductsbyCateg(select)
      .then((res) =>{
        scenarios(res)
        setallProductsPage(false)
      })

    } else if (sub) { // ----------------------------------------- subcategorias filter
      getProductsbyCateg(sub)
      .then((res) =>{
        scenarios(res)
        setallProductsPage(false)
      })

    } else { // -------------------------------------------------- ALL PRODUCTS
      const allProducts = await getAllProducts()
      setProducts(allProducts)
      setLoading(false)
      setallProductsPage(true)
    }
  }

  useEffect(() => {
    getProducts()
  }, [stateZip, filter, categ, sub])

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

  if (currentProducts?.length === 0) {
    setNotFound(true)
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
         <>
        <div className="row">
          { allProductsPage && <h4>Todos los productos</h4>}
          { filter && <h4>Resultados de <i>{filter}</i></h4>}
          { categ && <h3>{mainCateg} </h3>}
          { sub && <h3>{main[n]} icon-react {sub}</h3>}
        </div>
        <div className="row justify-content-center w-100">
          { 
            notFound
            ? <p>NOT FOUND</p>
            : (
              <>
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
                <div className="justify-content-center">
                <Pagination 
                  prodPerPage={prodPerPage}
                  totalProd={productsLenght} 
                  paginate={paginate}
                />
                </div>
              </>
            )
          }
          </div>
        </>
       )
      }
    </>
  )
}

export default Products
