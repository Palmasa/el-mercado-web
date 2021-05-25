import React, { useState } from 'react'
import useOffSet from '../../hooks/useOffSet'
import useWindowDimensions from '../../hooks/useWindow'
import HamburgerMenu from 'react-hamburger-menu'
import Searchbar from "../../components/Searchbar/Searchbar"
import CartButton from "../../components/CartButton/CartButton"
import ZipBar from '../../components/ZipBar/ZipBar'
import Menu from '../../components/Menu/Menu'
import logo from '../../images/logos/DARK.png'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import XsMenu from '../../components/Menu/XsMenu'

const Navbar = () => {
  const { width } = useWindowDimensions()
  const offset = useOffSet()
  const [openHam, setOpenHam] = useState(false)

  const handleHamClick = () => {
    setOpenHam(!openHam);
  }

  const closeMenu = () => {
    setOpenHam(false)
  }
  
  return (
    <>
    {
      width < 740
      ? (
        <>
        <div className="Navbar-xs">
          <div className="d-flex navbar-xs-top justify-content-between align-items-center p-3 m-0">
          <div className="col">
            <HamburgerMenu isOpen={openHam} menuClicked={handleHamClick.bind(this)}
              width={16} height={12}/>
            {
              openHam && <XsMenu closeMenu={closeMenu}/>
            }
          </div>
          <div className="col">
            <Link to="/"><img className="logo" style={{width: 80} }src={logo} alt="El Mercado"/></Link>
          </div>
          <div className="col d-flex justify-content-end">
            <CartButton />
          </div>
          </div>
            <Searchbar/>
            <ZipBar />
        </div>
        <div className="ghostMenu-xs"></div>
        </>
      ) : (
        <div className="margins-navbar">
          <div className="Navbar-fixed">
            <Link to="/"><img className="logo" src={logo} alt="El Mercado"/></Link>
            <div className="bar-fixed">
              <Searchbar />
            </div>
            <div className="cart-fixed">
              <CartButton />
            </div>
          </div>
          <div className="ghostMenu"></div>
          <div className="Navbar-moves">
            <Menu />
            <div className={`${ offset > 45 ? "fix" : ""}`}>
              <ZipBar />
            </div>
          </div>
        </div>
      )
    
    }
    </>
  )
}

export default Navbar
