import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import CategFilter from '../fragments/Products/CategFilter'
import Products from '../fragments/Products/Products'

const ProductsScreen = () => {
  return (
    <div className="Products">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <CategFilter />
          </div>
          <div className="col">
            <Products />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsScreen
