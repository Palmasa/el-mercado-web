import React from 'react'
import { Link } from 'react-router-dom'
import ShippingInfo from '../../fragments/CreateShipp/ShippingInfo'
import SuppNavbar from '../../fragments/SuppNavbar/SuppNavbar'

const ShippScreen = () => {
  return (
    <div>
      <SuppNavbar />
      <Link to="/envios-tiendas/crear-modelo-envio" >Crear nuevo modelo de envío</Link>
      <ShippingInfo />
    </div>
  )
}

export default ShippScreen
