import { GrLocation } from 'react-icons/gr'
import { BiChevronDown } from 'react-icons/bi'
import { ZipContext } from '../../contexts/ZipContext'
import { useContext, useState, useEffect } from 'react'
import './ZipBar.scss'

const ZipBar = () => {
  const { stateZip } = useContext(ZipContext)

  return (
    <button className="ZipBar">
      <GrLocation />
      {
        stateZip ? (<p style={{margin: 0}}>Envío a - {stateZip}</p>) : <p>Introduce un código postal</p>
      }
      
      <BiChevronDown />
    </button>
  )
}

export default ZipBar
