import { useEffect, useState, useContext, useCallback } from 'react'
import { IconContext } from "react-icons";
import { AiFillThunderbolt } from 'react-icons/ai'
import { ZipContext } from '../../contexts/ZipContext';
import { getBestSellers } from '../../services/RecommendService'

import ClipLoader from "react-spinners/ClipLoader";
import ProductCard from '../Products/ProductCard'
import { renameKey } from '../../helpers/renameKeysObj';

const BestSellers = () => {
  const { stateZip } = useContext(ZipContext)
  const [ products, setProducts ] = useState()
  const [ loading, setLoading] = useState(true)
  const [ currentPage, setCurrentPage] = useState(1)
  const [ prodPerPage ] = useState(12) // 18 num

  const getProducts = useCallback(
    async () => {
    const p = await getBestSellers()
    setProducts(p)
    setLoading(false)
  }, []
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [ stateZip ])

  useEffect(() => {
    if ( currentPage === 1) {
      getProducts()
    }
  }, [ currentPage, stateZip, getProducts ])
  
  const indexOfLastProduct = currentPage * prodPerPage
  const indexOfFirstProduct = indexOfLastProduct - prodPerPage
  let currentProducts = products?.resolveProducts?.slice(indexOfFirstProduct, indexOfLastProduct)

  if (!products?.resolveProducts) {
    if (products?.resolvedProductsZip) {
      let allP = products.resolvedProductsZip?.map((p) => ({...p._doc, noSend: p.noSend}))
      let allProducts = allP.map((p) => renameKey(p, '_id', 'id'))
      currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    }
  }

  return (
    <div className="container">
     {
       loading
       ? (
        <div style={{ height: 650}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
        </div>
       )
       : (
         <>
        <div className="row justify-content-center w-100">
              <div className="container">
              <div className="row my-5 justify-content-center">
              <IconContext.Provider value={{ color: "E15D45", className: "icon-thunder" }}>
                <h3> <AiFillThunderbolt /> Los más vendidos de El Mercado </h3>
              </IconContext.Provider>
              </div>
              <div className="row">
                {
                  currentProducts?.map((product, i) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-5 justify-content-center">
                      <ProductCard
                      product= {product}
                      bestSeller={i + 1 }
                      />
                    </div>
                  ))
                }
                </div>
                <div className=" row justify-content-center">
                </div>
              </div>
          </div>
        </>
       )
      }
    </div>
  )
}

export default BestSellers
