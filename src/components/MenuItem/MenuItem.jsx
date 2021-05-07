import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { BiChevronDown, BiChevronLeft } from 'react-icons/bi'
import MenuHover from '../MenuHover/MenuHover'
import './MenuItem.scss'

const MenuItem = ({ route, children}) => {
  const [ hover, setHover ] = useState(false)

  const toggleOut = () => {
    setHover(false)
  }
  
  const toggleIn = () => {
    setHover(true)
  }

  return (
    <>
    <NavLink 
    className="navlink"
    style={ hover ? {color: '#e15d45'} : {} }
    activeClassName="navselect"
    to={route}
    onMouseEnter={toggleIn}
    onMouseLeave={toggleOut}
    >
    {children}
    { hover ? <BiChevronLeft /> : <BiChevronDown /> }
    </NavLink>

    { hover && <MenuHover toggle={setHover} /> }
    </>
  )
}

export default MenuItem
