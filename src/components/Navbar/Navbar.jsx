import React, { useState } from 'react'
import Searchbar from "./Searchbar/Searchbar"
import CartButton from "./CartButton/CartButton"
/* import useOffSet from '../../hooks/useOffSet' */
import useWindowDimensions from '../../hooks/useWindow'
import HamburgerMenu from 'react-hamburger-menu'
import logo from '../../images/logos/DARK.png'
import './Navbar.scss'

const Navbar = () => {
  const { width } = useWindowDimensions()
  /* const offset = useOffSet() */
  const [openHam, setOpenHam] = useState(false)

  const handleHamClick = () => {
    setOpenHam(!openHam);
  }
  return (
    <>
    {
      width < 640 
      ? (
        <div className="Navbar">
          <div className="Navbar-xs">
            <HamburgerMenu isOpen={openHam} menuClicked={handleHamClick.bind(this)}
              width={18} height={15}
            />
            <img className="logo" src={logo} alt="El Mercado"/>
            <CartButton />
          </div>
          <Searchbar/>
        </div>
      ) : (
        <div className="Navbar">
          <img className="logo" src={logo} alt="El Mercado"/>
          <Searchbar />
          <CartButton /> 
        </div>
      )
    
    }
    </>
  )
}

export default Navbar
