import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import './AreaItem.scss'

const AreaItem = ({ route, children }) => {
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
    className="AreaItem"
    style={ hover ? {color: '#e15d45'} : {} }
    activeClassName="navselect"
    to={route}
    onMouseEnter={toggleIn}
    onMouseLeave={toggleOut}
    >
    <BsPerson />
    {children}
    </NavLink>
    </>
  )
}

export default AreaItem