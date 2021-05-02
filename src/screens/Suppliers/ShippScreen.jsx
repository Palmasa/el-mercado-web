import React from 'react'
import { Link } from 'react-router-dom'
import SuppNavbar from '../../fragments/SuppNavbar/SuppNavbar'

const ShippScreen = () => {
  return (
    <div>
      <SuppNavbar />
      <h6>Modelos de envío disponibles </h6>
      <Link to="/envios-tiendas/crear-modelo-envio" >Crear modelo de envío</Link>
    </div>
  )
}

export default ShippScreen
