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
        <div className="">
        <div className="Navbar-xs">
          <div className="d-flex justify-content-between align-items-center p-3 m-0">
            <HamburgerMenu isOpen={openHam} menuClicked={handleHamClick.bind(this)}
              width={16} height={12}/>
            <Link to="/"><img className="logo" style={{width: 80} }src={logo} alt="El Mercado"/></Link>
            <CartButton />
          </div>
            <Searchbar/>
            <ZipBar />
        </div>
        <div className="ghostMenu-xs"></div>
        </div>
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
