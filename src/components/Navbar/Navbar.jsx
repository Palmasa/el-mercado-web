import React, { useState } from 'react'
import useOffSet from '../../hooks/useOffSet'
import useWindowDimensions from '../../hooks/useWindow'
import HamburgerMenu from 'react-hamburger-menu'
import Searchbar from "../Searchbar/Searchbar"
import CartButton from "../CartButton/CartButton"
import ZipBar from '../ZipBar/ZipBar'
import Menu from '../Menu/Menu'
import logo from '../../images/logos/DARK.png'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  const { width } = useWindowDimensions()
  const offset = useOffSet()
  const [openHam, setOpenHam] = useState(false)

  const handleHamClick = () => {
    setOpenHam(!openHam);
  }
  
  return (
    <>
    {
      width < 640
      ? (
        <>
        <div className="ghostMenu-xs"></div>
        <div className="Navbar-xs">
          <div className="Navbar-top-xs">
            <HamburgerMenu isOpen={openHam} menuClicked={handleHamClick.bind(this)}
              width={16} height={12}
            />
            <Link to="/"><img className="logo" src={logo} alt="El Mercado"/></Link>
            <CartButton />
          </div>
          <div className="Navbar-bot-xs">
            <Searchbar/>
            <ZipBar />
          </div>
        </div>
        </>
      ) : (
        <div>
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
