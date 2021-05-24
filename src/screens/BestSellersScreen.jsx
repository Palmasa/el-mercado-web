import React from 'react'
import Navbar from '../fragments/Navbar/Navbar'
import BestSellers from '../fragments/BestSellers/BestSellers'

const BestSellersScreen = () => {
  return (
    <div className="BestSellers">
      <Navbar />
      <BestSellers />
    </div>
  )
}

export default BestSellersScreen