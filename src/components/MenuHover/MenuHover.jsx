import { useState, useEffect } from 'react'
import { allCategs } from '../../helpers/allCategs.js'
import { Redirect } from 'react-router'
import './MenuHover.scss'

const MenuHover = ({ toggle }) => {
  const [ mainCategs, setMain ] = useState([])
  const [param, setParam] = useState('')
  const [redirect, setRedirect] = useState(false)

  const getProducts = (i) => {
    setParam(i)
    setRedirect(true)
    setTimeout(() => {toggle(false)}, 10)
  }

  const paintCategs = () => {
    const main = Object.keys(allCategs)
    setMain(main)
  }

  const toggleOut = () => {
    toggle(false)
  }

  const toggleIn = () => {
    toggle(true)
  }

  useEffect(() => {
    paintCategs()
  }, [])

  return (
    <div 
      className="Categs container"
      onMouseEnter={toggleIn}
      onMouseLeave={toggleOut}
    >
        {
          mainCategs?.map((main, i) => (
            <button className="hover-categs" key={i} onClick={() => getProducts(i)}>{main}</button>
          ))
        }
    { redirect && (<Redirect to={`/productos?categoria=${param}`}/>)}
    </div>
  )
}

export default MenuHover
