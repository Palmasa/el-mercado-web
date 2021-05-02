import React from 'react'
import { Link } from 'react-router-dom'
import SuppNavbar from '../../fragments/SuppNavbar/SuppNavbar'

const ProductScreen = () => {
  return (
    <div>
      <SuppNavbar />
      <h6>Productos publicados, desactivados y posibilidad de boost</h6>
      <Link to="/productos-tiendas/crear-producto" >Crear producto</Link>
    </div>
  )
}

export default ProductScreen
