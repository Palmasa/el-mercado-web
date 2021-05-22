import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import { Redirect } from 'react-router'

const CategsScreen = () => {
  return (
    <div>
      <Navbar />
      {/* NO USO ESTA SCREEN (YET) */}
      <Redirect to="/productos" />
    </div>
  )
}

export default CategsScreen
