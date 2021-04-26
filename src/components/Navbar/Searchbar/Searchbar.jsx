import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { VscClose } from 'react-icons/vsc'
import { Redirect } from 'react-router'
import './Searchbar.scss'

const Searchbar = () => {
  const [ closeCross, setCloseCross ] = useState(false)
  const [search, setSearch] = useState('')
  /* const [param, setParam] = useState('')
  const [redirect, setRedirect] = useState(false) */

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    if (search !== '') {
      setCloseCross(true)
    }
  }

  const clearInput = () => {
    setSearch('')
    setCloseCross(false)
  }

  /* if (redirect) {
    <Redirect to={`/products/math?search=${param}`}/>
  } */

  return (
    <div className="Searchbar">
      <label className="Searchbar__glass" htmlFor="search">
        <AiOutlineSearch />
      </label>
      <input 
        className="Searchbar__input" 
        id="search" 
        placeholder="¿Qué estás buscando?" 
        autoComplete="off"
        onChange={handleChange}
        value={search}
        />
      { closeCross && <button className="cross" onClick={clearInput}><VscClose/></button> }
      {/*   
      <input onChange={(e) => setParam(e.target.value)}></input>
      <button onClick={() => setRedirect(true)}></button>
      */}
    </div>
  )
}

export default Searchbar
