import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import Products from '../fragments/Products/Products'

const ProductsScreen = () => {
  return (
    <div className="Products">
      <Navbar />
      <h1 style={{marginLeft: 40}}>Todos los productos</h1>
      <Products />
    </div>
  )
}

export default ProductsScreen
