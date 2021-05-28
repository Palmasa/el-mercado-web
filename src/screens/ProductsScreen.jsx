import React from 'react'
import Boosted from '../fragments/Home/Boosted'
import BoostedAll from '../fragments/Home/BoostedAll'
import Navbar from '../fragments/Navbar/Navbar'
import CategFilter from '../fragments/Products/CategFilter'
import Products from '../fragments/Products/Products'
import useWindowDimensions from '../hooks/useWindow'

const ProductsScreen = () => {
  const { width } = useWindowDimensions()

  return (
    <>
    <Navbar />
    { 
      width > 640 
      ? (
      <>
        <div className="container px-2 pt-4 pb-5 border-bottom">
          <div className="row">
            <div className="col-2 mr-5 p-0">
              <CategFilter />
            </div>
            <div className="col">
              <Products />
            </div>
          </div>
        </div>
        <Boosted />
        <BoostedAll />
      </>
      ) : (
        <>
        <div className="container px-2 py-3">
          <div className="row px-4">
            <CategFilter />
            <Products />
          </div>
        </div>
      </>
      )
    }
    </>
  )
}

export default ProductsScreen
