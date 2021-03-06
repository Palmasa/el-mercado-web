import { useState, useEffect, useContext, useCallback } from 'react'
import { ZipContext } from '../../contexts/ZipContext';
import { getAllProducts, getProductsBySearch, getProductsbyCateg } from '../../services/ProductsService'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import { allCategs } from '../../helpers/allCategs.js'
import { useLocation } from 'react-router';
import { BsChevronRight } from 'react-icons/bs'
import { IconContext } from "react-icons"
import ClipLoader from "react-spinners/ClipLoader";
import notFoundImg from '../../images/Screenshot 2021-05-09 at 01.22.33.png'
import './Products.scss'

let main = Object.keys(allCategs)
const subs = Object.values(allCategs)

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Products = () => {
  const { stateZip } = useContext(ZipContext)
  const [ products, setProducts ] = useState({})
  const [ loading, setLoading] = useState(false)
  const [ currentPage, setCurrentPage] = useState(1)
  const [ prodPerPage ] = useState(15) // 18 num
  const [ mainCateg, setMain ] = useState([])
  const [ notFound, setNotFound ] = useState(false)
  const [ allProductsPage, setallProductsPage ] = useState(false)

  let query = useQuery()
  let filter = query.get('filter')
  let categ = query.get('categoria')
  let sub = query.get('subcategoria')
  let n = query.get('n')

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

  const getProducts = useCallback(
    async () => {
        setLoading(true)
        if (filter) { // ---------------------------------------- From searchbar
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
          .then((res) => {
            scenarios(res)
            setallProductsPage(false)
          })
    
        } else if (sub) { // ----------------------------------------- subcategorias filter
          getProductsbyCateg(sub)
          .then((res) => {
            scenarios(res)
            setallProductsPage(false)
          })
    
        } else { // --------------------------------------------------- ALL PRODUCTS
          const allProducts = await getAllProducts()
          setNotFound(false)
          setProducts(allProducts)
          setLoading(false)
          setallProductsPage(true)
        }
      }, [ categ, filter, sub ]

  )

  useEffect(() => {
    setCurrentPage(1)
  }, [ categ, filter, sub, stateZip ])

  useEffect(() => {
    if ( currentPage === 1) {
      getProducts()
      window.scrollTo({top: 0})
    }
  }, [ getProducts, stateZip, currentPage ])

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
    window.scrollTo({top: 0})
  }

  return (
    <div className="container">
     {
       loading
       ? (
        <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
        </div>
       )
       : (
         <>
         <IconContext.Provider value={{ size: "0.5em"}}>
          <div className="row mb-3 mr-4 align-items-center justify-content-between">
            { allProductsPage && <h6>Todos los productos</h6>}
            { filter && <h6>Resultados de <i>{filter}</i></h6>}
            { categ && <h6>{mainCateg} </h6>}
            { sub && <h6>{main[n]} <BsChevronRight /> {sub}</h6>}
            <Pagination 
              prodPerPage={prodPerPage}
              totalProd={productsLenght} 
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
         </IconContext.Provider>
        <div className="row justify-content-center w-100">
          { 
            notFound
            ? (
              <>
              <div className="container">
              <div className="row justify-content-center w-100 mb-3">
                <img src={notFoundImg} alt="404" className="" style={{width: 240, marginTop: 100}}/>
              </div>
              <div className="row justify-content-center w-100">
                <p>Lo sentimos, a??n no se ha creado ning??n producto en { categ && <>{mainCateg}</>} { sub && <>{sub}</>} { filter && <i>{filter}</i>}</p>
              </div>
              </div>
              </>
            )
            : (
              <div className="container">
              <div className="row">
                {
                  currentProducts?.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-5 justify-content-center">
                      <ProductCard
                      product= {product}
                      />
                    </div>
                  ))
                }
                </div>
                <div className=" row justify-content-center">
                <Pagination 
                  prodPerPage={prodPerPage}
                  totalProd={productsLenght} 
                  paginate={paginate}
                  currentPage={currentPage}
                />
                </div>
              </div>
            )
          }
          </div>
        </>
       )
      }
    </div>
  )
}

export default Products
