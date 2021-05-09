import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import Home from '../fragments/Home/Home'
import { Redirect } from 'react-router'

const HomeScreen = () => {
  return (
    <div className="Home">
      <Navbar />
      <Redirect to="/productos" />
      <Home />
    </div>
  )
}

export default HomeScreen
