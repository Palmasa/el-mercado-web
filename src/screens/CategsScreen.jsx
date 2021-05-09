import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import Categories from '../fragments/Categories/Categories'
import { Redirect } from 'react-router'

const CategsScreen = () => {
  return (
    <div>
      <Navbar />
      <Categories />
      <Redirect to="/productos" />
    </div>
  )
}

export default CategsScreen
