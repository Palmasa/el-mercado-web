import React, { Children } from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { BiChevronDown, BiChevronLeft } from 'react-icons/bi'
import Categs from '../Categs/Categs'
import './MenuItem.scss'

const MenuItem = ({ route, categs, children}) => {
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

    { hover && <Categs toggle={setHover}/> }
    </>
  )
}

export default MenuItem
