import React from 'react'
import { Link } from 'react-router-dom'
import ProductInfo from '../../fragments/CreateProduct/ProductInfo'
import SuppNavbar from '../../fragments/SuppNavbar/SuppNavbar'

const ProductScreen = () => {
  return (
    <div>
      <SuppNavbar />
      <Link to="/productos-tiendas/crear-producto" >Crear producto</Link>
      <ProductInfo />
    </div>
  )
}

export default ProductScreen
