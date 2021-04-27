import React, { useState } from 'react'
import Searchbar from "./Searchbar/Searchbar"
import CartButton from "./CartButton/CartButton"
import useOffSet from '../../hooks/useOffSet'
import useWindowDimensions from '../../hooks/useWindow'
import HamburgerMenu from 'react-hamburger-menu'
import logo from '../../images/logos/DARK.png'
import './Navbar.scss'
import ZipBar from '../Zip/ZipBar/ZipBar'
import Menu from './Menu/Menu'

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
            <img className="logo" src={logo} alt="El Mercado"/>
            <CartButton />
          </div>
          <div className="Navbar-bot-xs">
            <Searchbar/>
            <ZipBar />
          </div>
        </div>
        </>
      ) : (
        <>
          <div className="Navbar-moves">
            <img className="logo" src={logo} alt="El Mercado"/>
            <div className="bar-moves">
              <Searchbar />
            </div>
            <CartButton />
          </div>
          <div className={`${ offset > 78 ? "ghostMenu" : ""}`}></div>
          <div className={`Navbar-fixed ${ offset > 78 ? "fix" : ""}`}> {/* 78 antes de que desaparezca y 155 después */}
            <Menu />
            <ZipBar />
          </div>
        </>
      )
    
    }
    </>
  )
}

export default Navbar
