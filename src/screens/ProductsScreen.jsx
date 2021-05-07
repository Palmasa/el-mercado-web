import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import CategFilter from '../fragments/Products/CategFilter'
import Products from '../fragments/Products/Products'

const ProductsScreen = () => {
  return (
    <>
      <Navbar />
      <div className="container px-2 py-4">
        <div className="row">
          <div className="col-2 mr-5 p-0">
            <CategFilter />
          </div>
          <div className="col">
            <Products />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsScreen
