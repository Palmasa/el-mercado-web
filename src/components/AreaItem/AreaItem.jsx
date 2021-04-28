import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import AreaHover from '../AreaHover/AreaHover'
import './AreaItem.scss'

const AreaItem = ({ route, children, name }) => {
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

    { hover && <AreaHover toggle={setHover} name={name}/> }
    </>
  )
}

export default AreaItem